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
  winningNum = 2, // This will be random later
  guessesLeft = 3;

//// UI Elements
const game = document.querySelector('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

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
    // disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = 'green';
    // Set message
    setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
  } else {
    // Wrong number guess
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - user lost
      guessInput.disabled = true;
      guessInput.style.borderColor = 'red'
      // Tell user its the wrong number
      setMessage(`Game Over, you lost. The correct number was ${winningNum}`, 'red');
    } else {
      // Game continues - answer wrong
      guessInput.style.borderColor = 'red';
      // Clear input 
      guessInput.value = '';

      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
  }
});

//// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}