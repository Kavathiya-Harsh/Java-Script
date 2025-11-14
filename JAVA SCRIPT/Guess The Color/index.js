const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const newRoundBtn = document.querySelector('#newRoundBtn');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');

const colorBoxes = document.querySelectorAll('.color-box'); 
const btntrack = document.querySelector  ('.color-box-container');    // return array of all btn
// console.log(colorBoxes);

// variables

var currentStreak = 0; // user -> track
var bestStreak = 0; // previously data fetch -> store
var pickCorrectColor = 0; // random number
var color = []; // 
var num = 6;

function webLoad(){
    onLoad();
    //colorGenerate();
    displayContent();
    setGame();
}

function onLoad(){
    var temp = localStorage.getItem('highBestStreak');
    if(temp!=null){
        bestStreak = parseInt(temp);
        // --> here the locolStorage contains the data so it will return the data not null
    }
    else{
        bestStreak = 0;
        // --> if there is  no data in localStorage so it will retun null insted of number
    }
}

// here we will define content msg in a function
// we call this function when we have to display any changes into web 
function displayContent(){
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}

// random color generator 
function colorGenerate(){
    var a = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var c = Math.floor(Math.random()*256);
    return `rgb(${a}, ${b}, ${c})`;
}
function generateColor(num){
    const arr = [];
    for(var i = 0; i<num; i++){
        arr.push(colorGenerate());
    }
    return arr;
}
function pickGenerator(){
    const math = Math.floor(Math.random()*color.length);
    return color[math];
}

function setGame(){
    color = generateColor(num); //color -> empty array -> main purpose to store the total 6 - different rgb() =
    pickCorrectColor = pickGenerator();
    // console.log(color);   
    console.log(pickCorrectColor);
    colorDisplay.textContent = pickCorrectColor;
    
    for(var i = 0; i < color.length; i++){
        colorBoxes[i].style.backgroundColor = color[i];
    }
}

webLoad();


//parent addeventlistener 


function trackBtn(event){

   var element = event.target;
   console.log(event.target);
   var rgb = element.style.backgroundColor;
   console.log(rgb);

   if(!rgb) return;

   if(rgb === pickCorrectColor){
   
    messageDisplay.textContent = "Correct !";

    currentStreak++;
    displayContent();
    setGame();
   

   if(currentStreak > bestStreak){

    currentStreak = bestStreak;
    localStorage.setItem("highBestStreak",bestStreak);
   }
    displayContent();
}

   else{
    console.log("You Lose");
    messageDisplay.textContent = "Try Again !";
    currentStreak = 0;
   }
     displayContent();
}
   
   


//addeventlistener ka use hamne child element ko track karne ke liye kara he .. 
btntrack.addEventListener('click',trackBtn);

function newPage(event){

    var hardBtn = location.reload();
}



newRoundBtn.addEventListener('click',setGame);

hardBtn.addEventListener("click",newPage);


easyBtn.addEventListener("click",function(){

    num = 3;
    if(num==3){
        for(var i = 3; i<6;i++){
            colorBoxes[i].style.display = "none";
        };
    }
    setGame();
});


function resetStreak(){

    currentStreak = 0;
    bestStreak = 0;

    

    displayContent();
};






