'use strict';
//Buttons
const nGameButton = document.querySelector('.new-game');
const rDiceButton = document.querySelector('.roll-dice');
const hScoreButton = document.querySelector('.hold-score');
//Game goal in points
const goal = 100;
//Audio sounds, beep on switch player, grunt on end, win on end
const beepSound = document.getElementById('change-player');
const pigGruntSound = document.getElementById('pig-grunt');
const winSound = document.getElementById('win');
//Dice image
let dice = document.getElementById('dice');
//Current scores elements
let pl0CurrScore = document.querySelector('.player-0-current');
let pl1CurrScore = document.querySelector('.player-1-current');
//Total scores elements
let pl0TotScore = document.querySelector('.player-0-total');
let pl1TotScore = document.querySelector('.player-1-total');
//Left and right sides of game board, where the active class is applied
let player0 = document.querySelector('.player-0');
let player1 = document.querySelector('.player-1');
//Headings, Player 1 an Player 2
let p0heading = document.querySelector('.p0-heading');
let p1heading = document.querySelector('.p1-heading');
//Active player variable
let activePlayer = 0;
//Score holders, current and total
let currentScore = [0, 0];
let totalScore = [0, 0];
//State variable, when false, everything besides 'New Game' button is 'dead'
let stateVariable = true;
//Sound on active player change
function playOnPlayersChange() {
  beepSound.play();
}
//Grunt on game end
function playOnGameEnd() {
  pigGruntSound.play();
}
//Sound on game end
function endSound() {
  winSound.play();
}
//Function to initialize the game and to reset the game. 'New Game' Button E.Listener calls init() function
function init() {
  currentScore = [0, 0];
  totalScore = [0, 0];
  activePlayer = 0;
  pl0CurrScore.innerText = 0;
  pl1CurrScore.innerText = 0;
  pl0TotScore.innerText = 0;
  pl1TotScore.innerText = 0;
  player0.classList.add('active');
  player1.classList.remove('active');
  dice.classList.add('hidden');
  playersReset();
  stateVariable = true;
}
init();

//Rolling the dice, adding the current score, changing active player if 1 is rolled
function rollDice() {
  if (stateVariable) {
    let tossDice = Math.trunc(Math.random() * 6 + 1);
    dice.src = `img/dice${tossDice}.png`;
    dice.classList.remove('hidden');
    dice.classList.add('show');
    //If dice number is not 1
    if (tossDice !== 1) {
      currentScore[activePlayer] += tossDice;
      activePlayer === 0
        ? (pl0CurrScore.innerText = currentScore[0])
        : (pl1CurrScore.innerText = currentScore[1]);
    } else {
      //Short timeout for player to actually see that he rolled 1
      setTimeout(() => {
        dice.classList.remove('show');
        dice.classList.add('hidden');
        currentScore[activePlayer] = 0;
        activePlayer === 0
          ? (pl0CurrScore.innerText = currentScore[0])
          : (pl1CurrScore.innerText = currentScore[1]);
        activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
        if (player0.classList.contains('active')) {
          activePlayer = 1;
          player0.classList.toggle('active');
          player1.classList.toggle('active');
          playOnPlayersChange();
        } else {
          activePlayer = 0;
          player0.classList.toggle('active');
          player1.classList.toggle('active');
          playOnPlayersChange();
        }
      }, 300);
    }
  }
}
//Calling rollDice
rDiceButton.addEventListener('click', rollDice);

//Style changes on P1 win
function firstPlayerWins() {
  p0heading.innerText = 'Winner !'; ///???
  p0heading.style.fontSize = '2.8rem';
  p0heading.style.color = 'var(--primary-color)';
  player1.classList.remove('active');
  player0.classList.add('active');
}
//Style changes on P2 win
function secondPlayerWins() {
  p1heading.innerText = 'Winner !'; ///???
  p1heading.style.fontSize = '2.8rem';
  p1heading.style.color = 'var(--primary-color)';
  player0.classList.remove('active');
  player1.classList.add('active');
}
//Style reset on init() calling
function playersReset() {
  p0heading.innerText = 'Player 1';
  p0heading.style.fontSize = '2.5rem';
  p0heading.style.color = 'white';

  p1heading.innerText = 'Player 2';
  p1heading.style.fontSize = '2.5rem';
  p1heading.style.color = 'white';
}

//Holding (adding) the score button
hScoreButton.addEventListener('click', function () {
  if (stateVariable) {
    dice.classList.remove('show');
    dice.classList.add('hidden');
    if (activePlayer === 0) {
      totalScore[0] += currentScore[0];
      pl0TotScore.innerText = totalScore[0];
      currentScore[0] = 0;
      pl0CurrScore.innerText = currentScore[0];
      activePlayer = 1;
      player0.classList.toggle('active');
      player1.classList.toggle('active');
      playOnPlayersChange();
      if (totalScore[0] >= goal) {
        firstPlayerWins();
        endSound();
        setTimeout(() => {
          playOnGameEnd();
        }, 2000);
        stateVariable = false;
      }
    } else {
      totalScore[1] += currentScore[1];
      pl1TotScore.innerText = totalScore[1];
      currentScore[1] = 0;
      pl1CurrScore.innerText = currentScore[1];
      activePlayer = 0;
      player0.classList.toggle('active');
      player1.classList.toggle('active');
      playOnPlayersChange();
      if (totalScore[1] >= goal) {
        secondPlayerWins();
        endSound();
        setTimeout(() => {
          playOnGameEnd();
        }, 2000);
        stateVariable = false;
      }
    }
  }
});

//Calling init() function to restart/reset the game
nGameButton.addEventListener('click', init);
