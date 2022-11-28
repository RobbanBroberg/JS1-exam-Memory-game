const timeTrialScoreBoard = document.querySelector('.timetrial');

const displayPlayerScore = document.querySelector('.player-score');
const difficultyContainer = document.querySelector('.difficulty_container');
const difficultyEasyBtn = document.querySelector('.difficulty-easy-btn');
const timeDisplay = document.querySelector('.time-display');

let playerScore = 0;

let interval;
let minutes = 10,
    seconds = 0;
let minutesDisplayed = minutes < 10 ? `0${minutes}` : minutes;
let secondsDisplayed = seconds < 10 ? `0${seconds}` : seconds;
let timer = `${minutesDisplayed}:${secondsDisplayed}`;

// function start game => add players, hide registration, show game body, run game,

//function for a timer ticking down
function timeLeft() {
    seconds -= 1;

    if (seconds == 0) {
        minutes -= 1;
        seconds = 59;
    }
}

// display update
function updateTimeTrialScoreBoard() {
    timeDisplay.innerText = `${timer}`;
    displayPlayerScore.innerText = playerScore;
}

function compareCardsTimeTrial(storedCards) {
    let cardOneValue = storedCards[0].target.getAttribute('data-name');
    let cardTwoValue = storedCards[1].target.getAttribute('data-name');

    // let parent1 = storedCards[0].target.parentNode;
    // let parent2 = storedCards[1].target.parentNode;

    if (cardOneValue == cardTwoValue) {
        //lock matching cards
        removeListenerFromMatchingCards(storedCards);
        //give points to the player::::
        playerScore += 1;
    } else {
        // Turn over non matching cards
        returnNonMatchingCardsFaceDown(storedCards);
    }
    storedCards.splice(0, 2);
    updateTimeTrialScoreBoard();
}

function startTimeTrialGame() {
    cardsClickedCounter = 0;
    let dubbleCards = cardArray.concat(cardArray);
    let randomizedCards = randomizeArray(dubbleCards);
    appendCardsToBoard(gameBoard, randomizedCards, 'single');
    updateTimeTrialScoreBoard();
}

// eventlistener

difficultyEasyBtn.addEventListener('click', () => {
    difficultyContainer.setAttribute('style', 'display: none;');
    gameBodyContainer.setAttribute('style', 'display: flex;');
    timeTrialScoreBoard.setAttribute('style', 'display: block;');
    interval = setInterval(timeLeft, 1000);
    startTimeTrialGame();
});

restartGameBtn.addEventListener('click', () => {
    gameBoard.innerHTML = '';
    startTimeTrialGame();
});
