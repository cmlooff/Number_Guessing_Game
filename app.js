/*
* GAME FUNCTION
  - Player must guess a number between a min and max
  - Player gets a certain amount of guesses
  - Notify the player of the correct answer if (lose)
  - Let player choose to play again
*/

//// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max), // This will be random later
  guessesLeft = 3;

//// UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//// Play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
  // Validate
  if (isNaN(guess) || guess < min || guess > max) { //! isNaN()
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  ////Check if user won
  if (guess === winningNum) {
    //* Game over - User won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    guessesLeft -= 1; // Wrong number guess

    if (guessesLeft === 0) {
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`); // Game over - user lost
    } else {
      guessInput.style.borderColor = 'red'; // Game continues - answer wrong
      guessInput.value = ''; // Clear input 
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
  }
});

//// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true; // disable input
  guessInput.style.borderColor = color; // Change border color
  message.style.color = color; // Set text color
  setMessage(msg);
  //// Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//// Get Winning Number RNG
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) // Math method for RNG
}

//// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}