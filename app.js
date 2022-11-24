// Memory examination exercise course JavScript 1, class KYHA_FE22

// Variables including from DOM
const gameBoard = document.querySelector('.game-board');

// object containing players name, score & card names

const cardArray = [
  {
    title: '2morrow',
    img: 'assets/2morrow.jpg'
  },
  {
    title: 'aview',
    img: 'assets/aview.jpg'
  },
  {
    title: 'casino',
    img: 'assets/casino.jpg'
  },
  {
    title: 'dieanother',
    img: 'assets/dieanother.jpg'
  },
  {
    title: 'goldeneye',
    img: 'assets/goldeneye.jpg'
  },
  {
    title: 'licence',
    img: 'assets/licence.jpg'
  },
  {
    title: 'notime',
    img: 'assets/notime.jpg'
  },
  {
    title: 'quantum',
    img: 'assets/quantum.jpg'
  },
  {
    title: 'skyfall',
    img: 'assets/skyfall.jpg'
  },
  {
    title: 'spectre',
    img: 'assets/spectre.jpg'
  },
  {
    title: 'theliving',
    img: 'assets/theliving.jpg'
  },
  {
    title: 'theworld',
    img: 'assets/theworld.jpg'
  },
];

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
        // console.log(`run times left: ${i - 1}`);
        let randomIndex = Math.floor(Math.random() * i);
        // console.log(randomIndex);
        result.unshift(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
}
randomizeArray(array);
console.log(result);

// function start game => add players, hide registration, show game body, run game,

// function Click card to flip
function handleCardClick(card) {}

// function Create cards data-value for compare
function createCard(card) {
    let cardContainer = document.createElement('div');
    let cardImg = document.createElement('div');
    let cardBack = document.createElement('img');
    let cardFront = document.createElement('img');

    cardContainer.classList.add('card-container');

    cardImg.classList.add('img-card');

    cardBack.setAttribute('src', 'assets/CardBack007.png');
    cardBack.classList.add('img-back');

    cardFront.setAttribute('src', card.img);
    cardFront.setAttribute('data-name', card.title);
    cardFront.classList.add('img-front');

    cardImg.append(cardBack, cardFront);

    cardContainer.append(cardImg);

    // Add a listener to every symbol button to be created
    cardContainer.addEventListener('click', (event) => {
        console.log(event);
    });

    return cardContainer;
}

// function to add all cards to the game board

function appendSymbolButtons(container) {
    for (let card of cardsArray) {
        container.append(createCard(card));
    }
}
// function compare cards

// eventlistener
