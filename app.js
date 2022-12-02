// Memory examination exercise course JavScript 1, class KYHA_FE22

// Variables including from DOM
const gameBoard = document.querySelector('.game-board');

const restartGameBtns = document.querySelectorAll('.restart-game-btn');
const quitToMenuBtns = document.querySelectorAll('.quit-to-menu-btn');

const gameBodyContainer = document.querySelector('.game-body');

const gameHistoryList = document.querySelector('.history-list');

const goldeneyeTheme = document.getElementById('goldeneyeTheme');
const muteBtn = document.getElementById('muteBtn');

const gameEndMsg = document.querySelector('.game-end-msg');
const endMsg = document.querySelector('.end-msg');
const twoPlayerScores = document.querySelector('.score-board-two');
const timePlayerScore = document.querySelector('.score-board-time');

let soundOnOff;

let cardsClickedCounter = 0;
let gameTurn = 0;
let lockBoard = false;

let gameMode;
let isAMatch;

let gameHistory;
let cardPairsToFind = 12; // Deafult 12 pairs

const storedCards = []; // For storing which two cards is clicked for comparison


//function for the sound mute/unmute button
function muteUnmute(){
  if(soundOnOff == 0){
    soundOnOff = 1;
    goldeneyeTheme.pause();
    muteBtn.innerHTML = '&#128360';

  }else{
    soundOnOff = 0;
    goldeneyeTheme.play();
    muteBtn.innerHTML = '&#128362';
  }
}

//Array ranomdizer insp. https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method

function randomizeArray(array) {
    const result = [];
    for (i = array.length; i >= 1; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        result.unshift(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return result;
}

// function start game => add players, hide registration, show game body, run game,

// display update

function updateGameHistory(storedCards, player) {
    let newSrc = storedCards[0].target.nextElementSibling;
    let historyItem = document.createElement('li');
    let cardImg = document.createElement('img');
    let cardImgSrc = newSrc.getAttribute('src');
    console.log(newSrc);
    cardImg.setAttribute('src', cardImgSrc);

    historyItem.innerText = `${player} found `;
    historyItem.append(cardImg);

    console.log(historyItem);
    gameHistoryList.insertAdjacentElement('afterbegin', historyItem);
}


// compares the cards that has been clicked and runs the handleMatching- and handleNonMatchingCards functions and returns a match-value either true or false
function compareCards(storedCards) {
    let cardOneValue = storedCards[0].target.getAttribute('data-name');
    let cardTwoValue = storedCards[1].target.getAttribute('data-name');

    if (cardOneValue == cardTwoValue) {
        return true;
    } else {
        return false;
    }
}


//lowers the opacity of matched cards and unlocks the gameboard for new cards to be clicked
function handleMatchingCards(storedCards) {
    let cardOne = storedCards[0].target.nextElementSibling;
    let cardTwo = storedCards[1].target.nextElementSibling;

    console.log(cardOne);
    console.log(cardTwo);

    setTimeout(() => {
        // add a class to lower opacity
        cardOne.classList.add('img-card-lower-opacity');
        cardTwo.classList.add('img-card-lower-opacity');

        lockBoard = false;
    }, 800);
}


// rotates non-matching cards back and unlocks the gameboard for new cards to be clicked
function handleNonMatchingCards(storedCards) {
    let cardOneParent = storedCards[0].target.parentNode;
    let cardTwoParent = storedCards[1].target.parentNode;

    setTimeout(() => {
        // remove the class to rotate the card face down
        cardOneParent.classList.remove('img-card-rotate');
        cardTwoParent.classList.remove('img-card-rotate');
        // re-add the eventlistener to the card
        cardOneParent.addEventListener('click', handleCardClick);
        cardTwoParent.addEventListener('click', handleCardClick);

        lockBoard = false;
    }, 1000);
}


// Displays a message of who won the game, and the scores
function handleTwoPlayerEndMsg() {
    gameEndMsg.setAttribute('style', 'display: flex;');
    endMsg.append(twoPlayerScores.cloneNode(true));
    let winnerMsg = document.createElement('p');
    winnerMsg.classList.add('winner-msg');
    winnerMsg.innerText = determinWinner();
    endMsg.append(winnerMsg);
}

// Displays a message of the amount of time it took you to complete the game
function handleTimeTrialEndMsg() {
    gameEndMsg.setAttribute('style', 'display: flex;');
    endMsg.append(timePlayerScore.cloneNode(true));
    let winnerMsg = document.createElement('p');
    winnerMsg.classList.add('winner-msg');
    let time = calculateCompletedInTime();
    winnerMsg.innerText = `You found all pairs in ${time}`;
    endMsg.append(winnerMsg);
}


function handleGameControls(mode, match) {
    if (mode == 'single') {
        scoreTimeTrial(match);
    } else if (mode == 'twoplayer') {
        scoreTwoPlayer(match);
    }

    if (match == true) {
        handleMatchingCards(storedCards);
        cardPairsToFind -= 1;
    } else {
        handleNonMatchingCards(storedCards);
    }

    if (cardPairsToFind == 0) {
        if (mode == 'single') {
            handleTimeTrialEndMsg();
        } else {
            handleTwoPlayerEndMsg();
        }
    }
    storedCards.splice(0, 2);
}

// function Click card to flip
function handleCardClick(card) {
  if(lockBoard) return;
  
    let parent = card.target.parentNode;
    parent.classList.add('img-card-rotate');
    cardsClickedCounter = (cardsClickedCounter + 1) % 2;
    storedCards.push(card);
    if (cardsClickedCounter == 0) {
        isAMatch = compareCards(storedCards); // returns true or false
        handleGameControls(gameMode, isAMatch);
        lockBoard = true;
    }
    //Removes the eventlsitener so you can't press an open card
    parent.removeEventListener('click', handleCardClick);
}

// function Create cards, creates HTML and adds card image and data-value for later compare
function createCard(card) {
    // First create the HTML for the card.
    let cardContainer = document.createElement('div');
    let cardImg = document.createElement('div');
    let cardBack = document.createElement('img');
    let cardFront = document.createElement('img');

    cardContainer.classList.add('card-container');

    cardImg.classList.add('img-card');

    cardBack.setAttribute('src', 'assets/CardBack007.png');
    cardBack.classList.add('img-back');
    cardBack.setAttribute('data-name', card.title);

    cardFront.setAttribute('src', card.img);
    cardFront.classList.add('img-front');

    cardImg.append(cardBack, cardFront);
    // Add a listener to every card to be created
    cardImg.addEventListener('click', handleCardClick);

    cardContainer.append(cardImg);

    return cardContainer;
}

// function to add all cards to the game board

function appendCardsToBoard(container, cardArray) {
    for (let card of cardArray) {
        container.append(createCard(card));
    }
}

//adding eventlisterner to all quit game buttons

for (let quitToMenuBtn of quitToMenuBtns) {
    quitToMenuBtn.addEventListener('click', () => {
        window.location.reload();
    });
}
