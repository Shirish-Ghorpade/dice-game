'use strict';
// selecting ele's who are responsible to show score on screen
const score0El = document.querySelector('#score--0');
const player0El = document.querySelector('.player--0');
const current0El = document.getElementById('current--0');
const score1El = document.getElementById('score--1');
const player1El = document.querySelector('.player--1');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Starting conditions
// Ithe textContent madhe string ch takayla lagnar ase kahi nahi number takle tari js tyala automatically string madhe karnar
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
// playing=false zala ki game sampla not code is executed
let playing = true;

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
// Action and events triggered after clicked on roll dice button
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate  random number
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    // console.log(diceNum);
    // 2.Display the dice of that random number
    diceEl.src = `dice-${diceNum}.png`;
    // 3.aata tya hidden class la remove kele
    diceEl.classList.remove('hidden');

    // 4. jar diceNum 1 nasel tar add kar tho diceNum currentScore madhe and 1 aala tar switch game to second player
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Action after clicked on hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to the activePlayer score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      // win the game means game is finished
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // game is over so remove the dice from the screen
      diceEl.classList.add('hidden');
    } else {
      // switch to another player
      switchPlayer();
    }
  }
});

// Action after clicked on new game button
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  score = [0, 0];
  currentScore = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  // varcha class player--winner remove zala ki activePlayer chi value zero kar
  activePlayer = 0;
});
