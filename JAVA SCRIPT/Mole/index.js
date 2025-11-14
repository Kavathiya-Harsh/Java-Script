//DOM Elements:
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document. querySelector('#startBtn');
const holes = document.querySelectorAll('.hole');
const moles = document. querySelectorAll('.mole');
const messageDisplay = document.querySelector('#message');

//Required variable:
var score = 0;
var time = 30;
var bestScore = 0;
var playGame = false;
var gameId = null;


//Common function:
function webLoad(){
    onLoad();
    displayContent();
}

function onLoad(){
    var temp = localStorage.getItem('highScoreMole');
    if(temp != null){
        bestScore = temp;
    }
    else{
        temp = 0;
    }
};

function displayContent(){
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;
}

function randomTime(min, max){
    return Math.floor(Math.random()*(max-min) + max);
}

function randomHole(){
    var index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function popGame(){
    var timer = randomTime(500,1500);
    var hole = randomHole();
    var mole = hole.querySelector('.mole');
    if(playGame){
        mole.classList.add('up');
        setTimeout(function(){
        mole.classList.remove('up');
        popGame();
    }, timer);
  }
}

function startGame(){
    time = 30;
    score = 0;
    startBtn.disabled = true;
    playGame = true;
    messageDisplay.textContent = "⚡Game Started! Whack the Moles! 🪓";
    popGame();

    gameId = setInterval(function(){
        time--;
        if(time == 0){
            endGame();
        }
        displayContent();
    },1000)
}

function endGame(){
    clearInterval(gameId);
    startBtn.disabled = false;
    playGame = false;
    if(score > bestScore){
        localStorage.setItem('highScoreMole', score);
        bestScore = score;
        messageDisplay.textContent = (`🎉New High Score! You got:${score} points!🏆`);
    }
    else{
         messageDisplay.textContent = (`💥Game Over! You scored:${score} Try again!`);
    }
    score = 0;
    displayContent();
}

function bonk(event){
    if(!event.isTrusted) return;
    if(playGame == false) return;
    if(event.target.classList.contains('up')){
        score++;
        event.target.classList.remove('up');
        event.target.classList.add('bonked');
    }
    setTimeout(function(){
        event.target.classList.remove('bonked');
        displayContent();
    },300);
}

webLoad();

moles.forEach((box)=>{
    box.addEventListener('click', bonk);
});

startBtn.addEventListener('click',startGame);



