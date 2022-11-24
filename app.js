// Memory examination exercise course JavScript 1, class KYHA_FE22

// Variables including from DOM
const gameBoard = document.querySelector('.game-board');

let cardsClickedCounter = 0;

const storedCards = []; // For storing which two cards is clicked for comparison

// object containing players name, score & card names

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
const players = [
    { name: 'kalle', score: 0 }, // name from DOM via function start game
    { name: 'pelle', score: 0 },
];

//Array ranomdizer insp. https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = [];

// console.log(`n = ${n}`);
function randomizeArray(array) {
    for (i = array.length; i >= 1; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        result.unshift(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
}
randomizeArray(cardArray.concat(cardArray));
console.log(result);

// function start game => add players, hide registration, show game body, run game,

// function Click card to flip
function handleCardClick(card) {
    let parent = card.target.parentNode;
    parent.classList.toggle('img-card-rotate');
    cardsClickedCounter = (cardsClickedCounter + 1) % 2;
    storedCards.push(card.target.getAttribute('data-name'));
    // if (cardsClickedCounter == 0) {
    //     compareCards();
    // }
    console.log(
        `storedCards: ${storedCards}, card conuter: ${cardsClickedCounter}`
    );
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

    cardContainer.append(cardImg);

    // Add a listener to every card to be created
    cardContainer.addEventListener('click', handleCardClick);

    return cardContainer;
}

// function to add all cards to the game board

function appendCardsToBoard(container) {
    for (let card of cardArray) {
        container.append(createCard(card));
    }
}

function startGame() {
    cardsClickedCounter = 0;
    appendCardsToBoard(gameBoard);
}
// function compare cards

// eventlistener

startGame();
