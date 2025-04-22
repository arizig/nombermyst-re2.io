// script.js

// DOM elements
const input = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const resultDisplay = document.getElementById('result');
const hintDisplay = document.getElementById('hint');
const attemptsDisplay = document.getElementById('attempts');
const playAgainBtn = document.getElementById('play-again');
const difficultySelect = document.getElementById('difficulty');

let mysteryNumber;
let maxTries;
let triesLeft;
let rangeMax;

// Initialize game based on selected difficulty
function initGame() {
  const difficulty = difficultySelect.value;
  if (difficulty === 'easy') {
    rangeMax = 10;
    maxTries = 3;
  } else if (difficulty === 'medium') {
    rangeMax = 50;
    maxTries = 2;
  } else {
    rangeMax = 100;
    maxTries = 1;
  }

  mysteryNumber = Math.floor(Math.random() * rangeMax) + 1;
  triesLeft = maxTries;

  // Reset UI
  input.disabled = false;
  submitBtn.disabled = false;
  resultDisplay.textContent = '';
  hintDisplay.textContent = '';
  playAgainBtn.style.display = 'none';
  input.value = '';
  updateAttemptsDisplay();
}

// Show attempts left
function updateAttemptsDisplay() {
  attemptsDisplay.textContent = `Attempts left: ${triesLeft}`;
}

// Check user's guess
function handleGuess() {
  const guess = parseInt(input.value);

  // Validate input
  if (isNaN(guess) || guess < 1 || guess > rangeMax) {
    resultDisplay.textContent = `Please enter a number between 1 and ${rangeMax}`;
    return;
  }

  // Disable UI temporarily for visual effect
  submitBtn.disabled = true;
  input.disabled = true;

  setTimeout(() => {
    triesLeft--;
    if (guess === mysteryNumber) {
      resultDisplay.textContent = `🎉 Correct! The number was ${mysteryNumber}`;
      endGame();
    } else if (triesLeft > 0) {
      resultDisplay.textContent = `❌ Wrong guess. Try again!`;
      hintDisplay.textContent = guess < mysteryNumber ? '🔼 Hint: Try a higher number!' : '🔽 Hint: Try a lower number!';
      updateAttemptsDisplay();
    } else {
      resultDisplay.textContent = `😢 You've used all attempts! The number was ${mysteryNumber}`;
      hintDisplay.textContent = '';
      endGame();
    }

    // Re-enable UI if game not over
    if (triesLeft > 0 && guess !== mysteryNumber) {
      input.disabled = false;
      submitBtn.disabled = false;
    }
  }, 500); // Delay for visual effect
}

// End game and show play again
function endGame() {
  submitBtn.disabled = true;
  input.disabled = true;
  playAgainBtn.style.display = 'inline-block';
}

// Event Listeners
submitBtn.addEventListener('click', handleGuess);
playAgainBtn.addEventListener('click', initGame);
difficultySelect.addEventListener('change', initGame);

// Start the first game
window.onload = initGame;
