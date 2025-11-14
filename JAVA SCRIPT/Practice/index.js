var para = document.querySelector('p');

para.style.color = 'green';

var obj1 = {
    backgroundColor : 'lightblue',
    fontwidth : '50px',
}

Object.assign(para.style,obj1);


// Element Creation 


var paraCreate = document.createElement('h2');

paraCreate.textContent = "Hello!";

document.body.append(paraCreate);





var Element = document.querySelector('div');

var  newElement= document.createElement('h1');

newElement.textContent= "Harsh";

Element.appendChild(newElement);






