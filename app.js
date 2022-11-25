// Memory examination exercise course JavScript 1, class KYHA_FE22

// Variables including from DOM
const gameBoard = document.querySelector('.game-board');

const playerOneNameField = document.querySelector('#reg-player-one');
const playerTwoNameField = document.querySelector('#reg-player-two');

const startGameBtn = document.querySelector('.start-game-btn');
const restartGameBtn = document.querySelector('.restart-game-btn');
const quitGameBtn = document.querySelector('.quit-to-menu-btn');
const gameBodyContainer = document.querySelector('.game-body');
const displayPlayerOneName = document.querySelector('player-one-name');
const displayPlayerOneScore = document.querySelector('player-one-score');
const displayPlayerTwoName = document.querySelector('player-two-name');
const displayPlayerTwoScore = document.querySelector('player-two-score');
const displayPlayersTurn = document.querySelector('current-player');

const playerRegistrationFields = document.querySelector('.player-reg');

let cardsClickedCounter = 0;
let gameTurn = 0;
const storedCards = []; // For storing which two cards is clicked for comparison

const playerOne = { name: '', score: 0 }; // .name will take value of playerOneNameField when started thourgt startGameBtn
const playerTwo = { name: '', score: 0 };

const players = [playerOne, playerTwo];

const cardArray = [
    {
        title: '2morrow',
        img: 'assets/2morrow.jpg',
    },
    {
        title: 'aview',
        img: 'assets/aview.jpg',
    },
    {
        title: 'casino',
        img: 'assets/casino.jpg',
    },
    {
        title: 'dieanother',
        img: 'assets/dieanother.jpg',
    },
    {
        title: 'goldeneye',
        img: 'assets/goldeneye.jpg',
    },
    {
        title: 'licence',
        img: 'assets/licence.jpg',
    },
    {
        title: 'notime',
        img: 'assets/notime.jpg',
    },
    {
        title: 'quantum',
        img: 'assets/quantum.jpg',
    },
    {
        title: 'skyfall',
        img: 'assets/skyfall.jpg',
    },
    {
        title: 'spectre',
        img: 'assets/spectre.jpg',
    },
    {
        title: 'theliving',
        img: 'assets/theliving.jpg',
    },
    {
        title: 'theworld',
        img: 'assets/theworld.jpg',
    },
];

console.log(cardArray[2].title);

//Array ranomdizer insp. https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method
// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const result = [];

// console.log(`n = ${n}`);
function randomizeArray(array) {
    for (i = array.length; i >= 1; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        result.unshift(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
}
// randomizeArray(cardArray.concat(cardArray));
// console.log(result);

// function start game => add players, hide registration, show game body, run game,


// display update
function scoreBoardUpdater(){
    let currentPlayer = players[gameTurn];
    displayPlayersTurn.innerText = `${currentPlayer}`;

    displayPlayerOneName.innerText = `${players[0].name}`;
    displayPlayerOneScore.innerText = `${players[0].score}`;
    displayPlayerTwoName.innerText = `${players[1].name}`;
    displayPlayerTwoScore.innerText = `${players[1].score}`;
}


function removeListenerFromMatchingCards(storedCards) {
    let cardOneParent = storedCards[0].target.parentNode;
    let cardTwoParent = storedCards[1].target.parentNode;

    cardOneParent.removeEventListener('click', handleCardClick);
    cardTwoParent.removeEventListener('click', handleCardClick);
}

function returnNonMatchingCardsFaceDown(storedCards) {
    console.log(storedCards[0].target.parentNode);
    console.log(storedCards[1].target.parentNode);
    let cardOneParent = storedCards[0].target.parentNode;
    let cardTwoParent = storedCards[1].target.parentNode;

    setTimeout(() => {
        cardOneParent.classList.remove('img-card-rotate');
        cardTwoParent.classList.remove('img-card-rotate');
    }, 1500);
}

function compareCards(storedCards) {

    let cardOneValue = storedCards[0].target.getAttribute('data-name');
    let cardTwoValue = storedCards[1].target.getAttribute('data-name');

    // let parent1 = storedCards[0].target.parentNode;
    // let parent2 = storedCards[1].target.parentNode;

    if (cardOneValue == cardTwoValue) {
        //lock matching cards
        removeListenerFromMatchingCards(storedCards);
        //give points to the player::::

        gameTurn = gameTurn; //current player plays again
    } else {
        // Turn over non matching cards
        returnNonMatchingCardsFaceDown(storedCards);
        gameTurn = (gameTurn + 1) % 2;
    }
    storedCards.splice(0, 2);
    scoreBoardUpdater();
}

// function Click card to flip
function handleCardClick(card) {
    let parent = card.target.parentNode;
    parent.classList.add('img-card-rotate');
    cardsClickedCounter = (cardsClickedCounter + 1) % 2;
    storedCards.push(card);
    if (cardsClickedCounter == 0) {
        compareCards(storedCards);
    }
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

function startGame() {
    gameTurn = 0;
    cardsClickedCounter = 0;
    appendCardsToBoard(gameBoard, result);
}
// function compare cards

// eventlistener

startGameBtn.addEventListener('click', () => {
    playerOne.name = playerOneNameField.value;
    playerTwo.name = playerTwoNameField.value;
    playerRegistrationFields.setAttribute('style', 'display: none;');
    gameBodyContainer.setAttribute('style', 'display: flex;');
    startGame();
});

// startGame();
