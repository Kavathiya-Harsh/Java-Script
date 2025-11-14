const boxes = document.querySelectorAll(".btn");

// console.log(boxes);

var player = true;//  player0 = true && player1 = false


const winner = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]

];  // Array -> winning possibilities


function disablebtn(){
      for(var b of boxes){
        b.innerHTML ="";
        b.disabled = false;

    }
};


function displayWinner(){

    for(let a of winner ){
        var btn1 = boxes[a[0]].innerHTML;
        var btn2 = boxes[a[1]].innerHTML;
        var btn3 = boxes[a[2]].innerHTML;
  

    if( btn1!="" && btn2!="" && btn3!=""){

        if(btn1 === btn2 && btn2 === btn3){

            // console.log("the winner is" + btn 1);

            if(btn1 === "o"){
                console.log("The winner is Player0");
            }
            else{
                console.log("The winner is Player1");
            }
            disablebtn();
        }
    }
}
}; 



boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
         if(player){

            // console.log(box.innerHTML);
            box.innerHTML = "0";
            player = false;
    }
    else{
         box.innerHTML = "X";
            player = true;
    }
    box.disabled = true;
    displayWinner();

    });
 
})

// event joh perform karne wala hai -> user
// uske behalf koi action perform 


// Example of for each loop 


var a = [1,2,3,4,5,6,659,7,45,789,456,123];
// array syntax 

for(var i =0;i<=9;i++){
console.log(a[i]);
}

a.forEach((i)=>{
    console.log(i);
}
)

// second pattern of using i print 

// for(var b of a){
//     console.log(b);
// }