var currentScore = document.querySelector('#currentScore');
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var resetButton = document.querySelector('#resetButton');
var statusMessage = document.querySelector('#statusMessage');
var pauseButton = document.querySelector('#pauseButton');
var video1 = document.querySelector('#video1');


var current = 0;
var high = 0;
var time1 = 10;
var track = false;
var idTrack = null;
var pause = false;
var endvideo;

function loadContent() {
  dataLoad();
  displayMessage();
}

function dataLoad() {
  var temp = localStorage.getItem('highScore');
  if (temp != null) {
    high = parseInt(temp);
  } else {
    high = 0;
  }
}

function displayMessage() {
  currentScore.textContent = current;
  highScore.textContent = high;
  timer.textContent = time1;

  if (current > 20) {
    currentScore.style.color = "red";
  } else {
    currentScore.style.color = "";
  }
}

function statuMsg(msg) {
  statusMessage.textContent = msg;
}

function startGame() {
  track = true;
  current = 0;
  time1 = 10;
  pause = false;
  clickButton.disabled = false;
  pauseButton.textContent = "Pause";
  statuMsg("Game started! Click the button fast!");
  displayMessage();

  clearInterval(idTrack);
  idTrack = setInterval(function () {
    if (!pause) {
      time1--;
      displayMessage();

      if (time1 <= 0) {
        endGame();
      }
    }
  }, 1000);
}

function endGame() {
  clearInterval(idTrack);
  track = false;
  clickButton.disabled = true;

  if (current > high) {
    localStorage.setItem('highScore', current);
    high = current; // ✅ fixed: was '==' before
    displayMessage();
    statuMsg("🎉 New High Score!");
    alert("Congratulations! New High Score: " + current);

    video1.style.display = "block";
    video1.play();
    video1.style.opacity = "1";


    setTimeout(() => {
      video1.style.opacity = "0";
      setTimeout(() => {
        video1.pause();
        video1.style.display = "none";
      }, 1000);
    }, 6000);
  }




  else if (current == high) {
  alert("Tie!");
  localStorage.setItem('highScore', current);
  high = current;
  displayMessage();
  statuMsg("🎉 Equal to High Score!");
} else {
  alert("Better luck next time!");
  statuMsg("Game Over!");
}
};

function clickMe() {
  if (track && !pause) {
    current++;
    displayMessage();
  }
}

function resetHighScore() {
  const confirmed = confirm('Are you sure you want to reset your high score?');
  if (confirmed) {
    localStorage.removeItem('highScore');
    high = 0;
    displayMessage();
    statuMsg('High score has been reset!');
  }
}

// ✅ Fixed Pause Function
function pauseGame() {
  if (!track) return; // only if game is active

  if (!pause) {
    pause = true;
    clickButton.disabled = true;
    pauseButton.textContent = 'Resume';
    statuMsg('⏸ Game paused');
  } else {
    pause = false;
    clickButton.disabled = false;
    pauseButton.textContent = 'Pause';
    statuMsg('▶ Game resumed! Keep clicking!');
  }
}

loadContent();

startButton.addEventListener('click', startGame);
clickButton.addEventListener('click', clickMe);
resetButton.addEventListener('click', resetHighScore);
pauseButton.addEventListener('click', pauseGame);
