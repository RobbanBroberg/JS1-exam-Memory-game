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

function updateTwoPlayerScoreBoard() {
    let currentPlayer = players[gameTurn].name;
    displayCurrentPlayer.innerText = `${currentPlayer}`;

    displayPlayerOneName.innerText = `${playerOne.name}:`;
    displayPlayerOneScore.innerText = `${playerOne.score}`;
    displayPlayerTwoName.innerText = `${playerTwo.name}:`;
    displayPlayerTwoScore.innerText = `${playerTwo.score}`;
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
        gameTurn = (gameTurn + 1) % 2;
    }
    storedCards.splice(0, 2);
    updateTwoPlayerScoreBoard();
}

startTwoPlayerGameBtn.addEventListener('click', () => {
    playerOne.name = playerOneNameField.value;
    playerTwo.name = playerTwoNameField.value;
    playerRegistrationFields.setAttribute('style', 'display: none;');
    gameBodyContainer.setAttribute('style', 'display: flex;');
    twoPlayerScoreBoard.setAttribute('style', 'display: block;');
    startTwoPlayerGame();
});

function startTwoPlayerGame() {
    gameTurn = 0;
    cardsClickedCounter = 0;
    let dubbleCards = cardArray.concat(cardArray);
    let randomizedCards = randomizeArray(dubbleCards);
    appendCardsToBoard(gameBoard, randomizedCards, 'multi');
    updateTwoPlayerScoreBoard();
}

// eventlistener

restartGameBtn.addEventListener('click', () => {
    gameBoard.innerHTML = '';
    startTwoPlayerGame();
});
