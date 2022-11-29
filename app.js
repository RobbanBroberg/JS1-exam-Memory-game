// Memory examination exercise course JavScript 1, class KYHA_FE22

// Variables including from DOM
const gameBoard = document.querySelector('.game-board');

const restartGameBtn = document.querySelector('.restart-game-btn');
const quitToMenuBtn = document.querySelector('.quit-to-menu-btn');
const gameBodyContainer = document.querySelector('.game-body');

const gameHistoryList = document.querySelector('.history-list');

let cardsClickedCounter = 0;
let gameTurn = 0;

let gameMode;
let isAMatch;

let gameHistory;
let cardPairsFound;

const storedCards = []; // For storing which two cards is clicked for comparison

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
    cardImgSrc = newSrc.getAttribute('src');
    console.log(newSrc);
    cardImg.setAttribute('src', cardImgSrc);

    historyItem.innerText = `${player} found: `;
    historyItem.append(cardImg);

    console.log(historyItem);
    gameHistoryList.append(historyItem);
}

function compareCards(storedCards) {
    let cardOneValue = storedCards[0].target.getAttribute('data-name');
    let cardTwoValue = storedCards[1].target.getAttribute('data-name');

    if (cardOneValue == cardTwoValue) {
        return true;
    } else {
        return false;
    }
}

function handleMatchingCards(storedCards) {
    let cardOne = storedCards[0].target.nextElementSibling;
    let cardTwo = storedCards[1].target.nextElementSibling;

    console.log(cardOne);
    console.log(cardTwo);

    setTimeout(() => {
        // add a class to lower opacity
        cardOne.classList.add('img-card-lower-opacity');
        cardTwo.classList.add('img-card-lower-opacity');
    }, 800);
}

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
    }, 1000);
}

function handleGameControls(mode, match) {
    if (mode == 'single') {
        scoreTimeTrial(match);
    } else if (mode == 'twoplayer') {
        scoreTwoPlayer(match);
    }

    if (match == true) {
        handleMatchingCards(storedCards);
        cardPairsFound += 1;
    } else {
        handleNonMatchingCards(storedCards);
    }
    storedCards.splice(0, 2);
}

// function Click card to flip
function handleCardClick(card) {
    let parent = card.target.parentNode;
    parent.classList.add('img-card-rotate');
    cardsClickedCounter = (cardsClickedCounter + 1) % 2;
    storedCards.push(card);
    if (cardsClickedCounter == 0) {
        isAMatch = compareCards(storedCards); // returns true or false
        handleGameControls(gameMode, isAMatch);
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

quitToMenuBtn.addEventListener('click', () => {
    window.location.reload();
});
