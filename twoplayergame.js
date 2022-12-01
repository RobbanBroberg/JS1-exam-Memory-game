// Variables including from DOM

const playerOneNameField = document.querySelector('#reg-player-one');
const playerTwoNameField = document.querySelector('#reg-player-two');

const startTwoPlayerGameBtn = document.querySelector('.start-game-btn');

const twoPlayerScoreBoard = document.querySelector('.two-player');

const displayPlayerOneName = document.querySelector('.player-one-name');
const displayPlayerOneScore = document.querySelector('.player-one-score');
const displayPlayerTwoName = document.querySelector('.player-two-name');
const displayPlayerTwoScore = document.querySelector('.player-two-score');
const displayCurrentPlayer = document.querySelector('.current-player');

const playerRegistrationFields = document.querySelector('.player-reg');

const playerOne = { name: '', score: 0 }; // .name will take value of playerOneNameField when started thourgt startGameBtn
const playerTwo = { name: '', score: 0 };

const players = [playerOne, playerTwo];

// Function to update the scoreboard

function updateTwoPlayerScoreBoard() {
    let currentPlayer = players[gameTurn].name;
    displayCurrentPlayer.innerText = `${currentPlayer}`;

    displayPlayerOneName.innerText = `${playerOne.name}`;
    displayPlayerOneScore.innerText = `${playerOne.score}`;
    displayPlayerTwoName.innerText = `${playerTwo.name}`;
    displayPlayerTwoScore.innerText = `${playerTwo.score}`;
}

// function to compare the players points to se who won
function determinWinner() {
    if (playerOne.score > playerTwo.score) {
        return `The winner is ${playerOne.name}!`;
    } else if (playerOne.score < playerTwo.score) {
        return `The winner is ${playerTwo.name}!`;
    } else {
        return `It's a tie`;
    }
}

// function to score the current player if the cards match or sets the next player
function scoreTwoPlayer(match) {
    if (match == true) {
        //give points to the player::::
        players[gameTurn].score += 1;

        updateGameHistory(storedCards, players[gameTurn].name);

        gameTurn = gameTurn; //current player plays again

        updateTwoPlayerScoreBoard();
    } else {
        setTimeout(() => {
            gameTurn = (gameTurn + 1) % 2;
            updateTwoPlayerScoreBoard();
        }, 1000);
    }
}

// resets gameparameters and starts the game again
function restartTwoPlayerGame() {
    gameBoard.innerHTML = '';
    gameHistoryList.innerHTML = '';
    playerOne.score = 0;
    playerTwo.score = 0;
    cardPairsToFind = 12;
    gameEndMsg.setAttribute('style', 'display: none;');
    startTwoPlayerGame();
}

// start game function
function startTwoPlayerGame() {
    gameTurn = 0;
    cardsClickedCounter = 0;
    let dubbleCards = cardArray.concat(cardArray);
    let randomizedCards = randomizeArray(dubbleCards);
    appendCardsToBoard(gameBoard, randomizedCards); // calls the function that adds all cards to the board.
    updateTwoPlayerScoreBoard();

    // Giving the reastart buttons their eventlistener
    for (let restartGameBtn of restartGameBtns) {
        restartGameBtn.addEventListener('click', () => {
            restartTwoPlayerGame();
        });
    }
}

// function for the start Two Player Game btn
function handleStartTwoPlayerGameBtnClick() {
    playerOne.name = playerOneNameField.value;
    playerTwo.name = playerTwoNameField.value;
    playerRegistrationFields.setAttribute('style', 'display: none;');
    gameBodyContainer.setAttribute('style', 'display: flex;');
    twoPlayerScoreBoard.setAttribute('style', 'display: block;');
    gameMode = 'twoplayer';
    startTwoPlayerGame();
}

// eventlistener

startTwoPlayerGameBtn.addEventListener('click', () => {
    handleStartTwoPlayerGameBtnClick();
});
