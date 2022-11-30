// Variables including from DOM

const timeTrialScoreBoard = document.querySelector('.timetrial');

const displayPlayerScore = document.querySelector('.player-score');

const difficultyContainer = document.querySelector('.difficulty_container');
const difficultyEasyBtn = document.querySelector('.difficulty-easy-btn');
const difficultyMediumBtn = document.querySelector('.difficulty-medium-btn');
const difficultyHardBtn = document.querySelector('.difficulty-hard-btn');

const timeDisplay = document.querySelector('.time-display');
const currentTime = document.querySelector('.current-time')

// To store player points
let playerScore = 0;

// will store the cards based on wich game mode is selected,
//   -see functions for handle difficulty btn down below
let cardsByGameMode;

// the same as total number of pairs available, default 12 but changes depending on game mode
//   -see functions for handle difficulty btn down below
let maxPoints;

// variables used by the timer function
let initialMinute;
let minute;
let second = 0;
let timerId;

// function to write out the Game Over ("Time has run out") -message
function handleGameOverMsg() {
    gameEndMsg.setAttribute('style', 'display: flex;');
    endMsg.innerHTML = '<img src="assets/gameLost.gif" alt="" />';
}

// countdown timer, initial minute is set by game mode,
//   -see functions for handle difficulty btn down below
// stops game if all pairs are found or time is up.
function timer() {
    second--;
    if (second == -1) {
        minute--;
        second = 59;
    }
    let secondsDisplayed = second < 10 ? `0${second}` : second;
    currentTime.innerText = `${minute}:${secondsDisplayed}`;

    if(minute == 0 && second == 30) {
      currentTime.classList.add('blinking-timer');
    }

    if (playerScore == maxPoints) {
        // stopp the timer if all pairs is found
        clearInterval(timerId);
    } else if (minute == 0 && second == 0) {
        // stopp timer and throw game over msg if timer hits 0
        clearInterval(timerId);
        handleGameOverMsg();
    }
}

// calculating how long it took to find all pairs
function calculateCompletedInTime() {
    let timeLeft = minute * 60 + second;
    completedInTime = initialMinute * 60 - timeLeft;
    completedMinutes = Math.floor(completedInTime / 60);
    completedSeconds = completedInTime % 60;
    let completedSecondsDisplayed = completedSeconds < 10 ? `0${completedSeconds}` : completedSeconds;
    return `${completedMinutes} : ${completedSecondsDisplayed}`;
}

// update the score bord display
function updateTimeTrialScoreBoard() {
    displayPlayerScore.innerText = playerScore;
}

// give the player a point if cards match
function scoreTimeTrial(match) {
    if (match == true) {
        playerScore += 1;
        updateGameHistory(storedCards, 'You');
    }
    updateTimeTrialScoreBoard();
}

// resets gameparameters and starts the game again
function restartTimeTrialGame() {
    gameBoard.innerHTML = '';
    gameHistoryList.innerHTML = '';
    clearInterval(timerId);
    gameEndMsg.setAttribute('style', 'display: none;');
    startTimeTrialGame();
}

// start game function
function startTimeTrialGame() {
    cardsClickedCounter = 0;
    playerScore = 0;
    let dubbleCards = cardsByGameMode.concat(cardsByGameMode); // dubble the cards to have pairs
    let randomizedCards = randomizeArray(dubbleCards);
    appendCardsToBoard(gameBoard, randomizedCards, 'single'); // calls the function that adds all cards to the board.
    updateTimeTrialScoreBoard();
    minute = initialMinute;
    second = 0;
    timerId = setInterval(timer, 1000);
    

    // Giving the reastart buttons their eventlistener
    for (let restartGameBtn of restartGameBtns) {
        restartGameBtn.addEventListener('click', () => {
            restartTimeTrialGame();
        });
    }
}

// Functions for handeling the different difficulty button clicks

// The same for all difficulty buttons
function handleDifficultyBtnClick() {
    difficultyContainer.setAttribute('style', 'display: none;');
    gameBodyContainer.setAttribute('style', 'display: flex;');
    timeTrialScoreBoard.setAttribute('style', 'display: block;');
    gameMode = 'single';
}

// for the difficulty Easy button
function handleEasyBtnClick() {
    initialMinute = 5;
    currentTime.innerText = `${initialMinute}:0${second}`;
    cardsByGameMode = cardArray;
    maxPoints = 12;
    startTimeTrialGame();
}

// for the difficulty Medium button
function handleMediumBtnClick() {
    initialMinute = 2;
    currentTime.innerText = ` ${initialMinute}:0${second}`;
    cardsByGameMode = cardArray;
    maxPoints = 12;
    startTimeTrialGame();
}

// for the difficulty Hard button
function handleHardBtnClick() {
    initialMinute = 2;
    currentTime.innerText = ` ${initialMinute}:0${second}`;
    cardsByGameMode = cardArray.concat(moreCards);

    maxPoints = 18;
    cardPairsToFind = 18;
    startTimeTrialGame();

    let cardContainers = document.querySelectorAll('.card-container');
    for (let container of cardContainers) {
        console.log(container);
        container.setAttribute('style', 'width: 85px; height: 123px;');
    }
}
// adding eventlisteners to the different buttons specific for the time trial game

difficultyEasyBtn.addEventListener('click', () => {
    handleDifficultyBtnClick();
    handleEasyBtnClick();
});

difficultyMediumBtn.addEventListener('click', () => {
    handleDifficultyBtnClick();
    handleMediumBtnClick();
});

difficultyHardBtn.addEventListener('click', () => {
    handleDifficultyBtnClick();
    handleHardBtnClick();
});
