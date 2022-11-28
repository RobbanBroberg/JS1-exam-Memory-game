const displayNumOfPairs = document.querySelector('.player-one-name');
const difficultyContainer = document.querySelector('.difficulty_container');
const difficultyEasyBtn = document.querySelector('.difficulty-easy');
const turnDisplay = document.querySelector('.turn-display');

let interval;
let minutes = 10, seconds = 0;
let minutesDisplayed = minutes < 10 ? `0${minutes}` : minutes;
let secondsDisplayed = seconds < 10 ? `0${seconds}` : seconds;
let timer = `Time left: ${minutesDisplayed}:${secondsDisplayed}`

function randomizeArray(array) {
  const result = [];
  for (i = array.length; i >= 1; i--) {
      let randomIndex = Math.floor(Math.random() * i);
      result.unshift(array[randomIndex]);
      array.splice(randomIndex, 1);
  }
  return result;
}
// randomizeArray(cardArray.concat(cardArray));
// console.log(result);

// function start game => add players, hide registration, show game body, run game,

//function for a timer ticking down
function timeLeft() {

  seconds -= 1;

  if(seconds == 0){
    minutes -= 1
    seconds = 59;
  }
}


// display update
function scoreBoardUpdater() {
  turnDisplay.innerText = `${timer}`;
  displayNumOfPairs.innerText = `Matched pairs:`;
  displayPlayerOneScore.innerText = `${playerOne.score}`;
}



function removeListenerFromMatchingCards(storedCards) {
  let cardOneParent = storedCards[0].target.parentNode;
  let cardTwoParent = storedCards[1].target.parentNode;

  cardOneParent.removeEventListener('click', handleCardClick);
  cardTwoParent.removeEventListener('click', handleCardClick);
}

function returnNonMatchingCardsFaceDown(storedCards) {
  
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
      players[gameTurn].score += 1;
      gameTurn = gameTurn; //current player plays again
  } else {
      // Turn over non matching cards
      returnNonMatchingCardsFaceDown(storedCards);
      gameTurn = gameTurn;
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

function startTimeTrialGame() {
  gameTurn = 0;
  cardsClickedCounter = 0;
  let dubbleCards = cardArray.concat(cardArray);
  let randomizedCards = randomizeArray(dubbleCards);
  appendCardsToBoard(gameBoard, randomizedCards);
  scoreBoardUpdater();
}

// eventlistener

difficultyEasyBtn.addEventListener('click', () => {
  // playerOne.name = playerOneNameField.value;
  // playerTwo.name = playerTwoNameField.value;
  difficultyContainer.setAttribute('style', 'display: none;');
  gameBodyContainer.setAttribute('style', 'display: flex;');
  interval = setInterval(timeLeft, 1000);
  startTimeTrialGame();
});

restartGameBtn.addEventListener('click', () => {
  gameBoard.innerHTML = '';
  startTimeTrialGame();
});