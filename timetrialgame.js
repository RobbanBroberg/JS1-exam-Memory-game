// Variables including from DOM

const timeTrialScoreBoard = document.querySelector('.timetrial');

const displayPlayerScore = document.querySelector('.player-score');
const difficultyContainer = document.querySelector('.difficulty_container');
const difficultyEasyBtn = document.querySelector('.difficulty-easy-btn');
const timeDisplay = document.querySelector('.time-display');

let playerScore = 0;

// let interval;
// let minutes = 10,
//     seconds = 0;
// let minutesDisplayed = minutes < 10 ? `0${minutes}` : minutes;
// let secondsDisplayed = seconds < 10 ? `0${seconds}` : seconds;
// // let timer = `${minutesDisplayed}:${secondsDisplayed}`;

// //function for a timer ticking down
// function timeLeft() {
//     seconds -= 1;

//     if (seconds == 0) {
//         minutes -= 1;
//         seconds = 59;
//     }
// }
// x;

let minute = 0;
let second = 0;
let timerId;
function timer() {
    second++;
    if (second == 60) {
        minute++;
        second = 0;
    }
    timeDisplay.innerText = `${minute}:${second}`;

    if (minute == 3 || playerScore == 12) {
        clearInterval(timerId);
    }
}

// display update
function updateTimeTrialScoreBoard() {
    // timeDisplay.innerText = `${timer}`;
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
    // interval = setInterval(timeLeft, 1000);
    gameMode = 'single';
    startTimeTrialGame();
});

restartGameBtn.addEventListener('click', () => {
    gameBoard.innerHTML = '';
    gameHistoryList.innerHTML = '';
    startTimeTrialGame();
});
