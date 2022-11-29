// Variables including from DOM

const timeTrialScoreBoard = document.querySelector('.timetrial');

const displayPlayerScore = document.querySelector('.player-score');
const difficultyContainer = document.querySelector('.difficulty_container');
const difficultyEasyBtn = document.querySelector('.difficulty-easy-btn');
const difficultyMediumBtn = document.querySelector('.difficulty-medium-btn');
const difficultyHardBtn = document.querySelector('.diffculty-hard-btn');
const timeDisplay = document.querySelector('.time-display');

let playerScore = 0;

let minute;
let second = 0;
let timerId;


function timer() {

  let secondsDisplayed = second < 10 ? `0${second}` : second;
  timeDisplay.innerText = `Time left: ${minute}:${secondsDisplayed}`;

    second--;
    if (second == -1) {
        minute--;
        second = 59;
    }

    if (minute == 0 || playerScore == 12) {
        clearInterval(timerId);
    }
}

// display update
function updateTimeTrialScoreBoard() {
    displayPlayerScore.innerText = playerScore;
}

function scoreTimeTrial(match) {
    if (match == true) {
        playerScore += 1;
        updateGameHistory(storedCards, 'Player');
    }
    updateTimeTrialScoreBoard();
}

function startTimeTrialGame() {
    cardsClickedCounter = 0;
    playerScore = 0;
    let dubbleCards = cardArray.concat(cardArray);
    let randomizedCards = randomizeArray(dubbleCards);
    appendCardsToBoard(gameBoard, randomizedCards, 'single');
    updateTimeTrialScoreBoard();
    timerId = setInterval(timer, 1000);
}

// eventlistener

difficultyEasyBtn.addEventListener('click', () => {
    difficultyContainer.setAttribute('style', 'display: none;');
    gameBodyContainer.setAttribute('style', 'display: flex;');
    timeTrialScoreBoard.setAttribute('style', 'display: block;');
    gameMode = 'single';
    minute = 5;
    timeDisplay.innerText = `Time left: ${minute}:0${second}`;
    startTimeTrialGame();
});

difficultyMediumBtn.addEventListener('click', () => {
  difficultyContainer.setAttribute('style', 'display: none;');
  gameBodyContainer.setAttribute('style', 'display: flex;');
  timeTrialScoreBoard.setAttribute('style', 'display: block;');
  gameMode = 'single';
  minute = 2;
  timeDisplay.innerText = `Time left: ${minute}:0${second}`;
  startTimeTrialGame();
});

difficultyHardBtn.addEventListener('click', () => {
  difficultyContainer.setAttribute('style', 'display: none;');
  gameBodyContainer.setAttribute('style', 'display: flex;');
  timeTrialScoreBoard.setAttribute('style', 'display: block;');
  gameMode = 'single';
  minute = 2;
  timeDisplay.innerText = `Time left: ${minute}:0${second}`;
  startTimeTrialGame();
});

restartGameBtn.addEventListener('click', () => {
    gameBoard.innerHTML = '';
    gameHistoryList.innerHTML = '';
    startTimeTrialGame();
});
