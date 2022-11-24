// Memory examination exercise course JavScript 1, class KYHA_FE22

// Variables including from DOM

// object containing players name, score
const players = [
    { name: kalle, score: 0 }, // name from DOM via function start game
    { name: pelle, score: 0 },
];

//Array ranomdizer insp. https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = [];
let n = array.length;
console.log(`n = ${n}`);
for (i = n; i >= 1; i--) {
    console.log(`run times left: ${i - 1}`);
    let randomIndex = Math.floor(Math.random() * i);
    console.log(randomIndex);
    result.unshift(array[randomIndex]);
    array.splice(randomIndex, 1);
}
console.log(result);


// function start game => add players, hide registration, show game body, run game,

// function Create cards data-value for compare
  function pushImages () {
    
  }
// function Click card to flip

// function compare cards

// eventlistener
