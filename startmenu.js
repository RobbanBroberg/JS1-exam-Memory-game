const twoPlayersMenuBtn = document.querySelector('.two-players_menu-btn');
const timeTrialMenuBtn = document.querySelector('.time-trial_menu-btn');
const startMenu = document.querySelector('.start-menu');

twoPlayersMenuBtn.addEventListener('click', (event) => {
  event.preventDefault();
  startMenu.setAttribute('style', 'display: none');
  playerRegistrationFields.setAttribute('style', 'display: flex');
});


timeTrialMenuBtn.addEventListener('click', (event) => {
  event.preventDefault();
  startMenu.setAttribute('style', 'display: none');
  difficultyContainer.setAttribute('style', 'display: flex');
  displayPlayerTwoName.setAttribute('style', 'display: none');
  displayPlayerTwoScore.setAttribute('style', 'display: none');
})