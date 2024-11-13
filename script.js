let timerInterval;
let remainingTime = 0;

const timerDisplay = document.getElementById('timer-display');
const timerInput = document.getElementById('timer-input');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingTime);
  timerDisplay.classList.toggle('red', remainingTime < 10);
}

function startTimer() {
  const timeParts = timerInput.value.split(':');
  remainingTime = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);

  if (isNaN(remainingTime) || remainingTime <= 0) {
    alert('Please enter a valid time in MM:SS format.');
    return;
  }

  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  timerInput.disabled = true;

  timerInterval = setInterval(() => {
    remainingTime -= 1;
    updateDisplay();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alert('Time is up!');
      resetControls();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetControls() {
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  timerInput.disabled = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  remainingTime = 0;
  updateDisplay();
  resetControls();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

timerInput.addEventListener('input', () => {
  startButton.disabled = timerInput.value.trim() === '';
});
