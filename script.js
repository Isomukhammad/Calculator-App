const equationField = document.getElementById('eqField')
const input = document.querySelector('#input');
const body = document.querySelector('html');
const number = document.querySelectorAll('.number');
const del = document.querySelector('#del');
const plus = document.querySelector('#plus');
const subtraction = document.querySelector('#subtraction');
const division = document.querySelector('#division');
const multi = document.querySelector('#multiplication');
const dot = document.querySelector('#dot');
const reset = document.querySelector('#reset');
const resultValue = document.querySelector('#result');

let eqNum = 0.0;
let equation = '';
let calEq = '';
let solved = 0;
let deleteOff = 0;
let block = 1;

//get value from input
input.addEventListener('input', function(){
    getVal(input);
})

//events when keyboard button are pressed
body.addEventListener('keydown', function(e) {
    if(e.key == '+' ||
    e.key == '-' ||
    e.key == '*' ||
    e.key == '/'){
        if(input.value.charAt(input.value.length - 1) == '+' || 
    input.value.charAt(input.value.length - 1) == '-' ||
    input.value.charAt(input.value.length - 1) == '*' ||
    input.value.charAt(input.value.length - 1) == '/'){
            return false;
        }
        
        if(!input.value){
            return false
        } 
    }

    if(e.which == 8){
        del.click();
    }

    if(e.which == 13){
        resultValue.click();
    }

    if(!validateFloat(e.key)){
        return false;
    }

    eqFieldDisplay();

    if(e.key == '+'){
        plus.click();
    }

    if(e.key == '-'){
        subtraction.click();
    }

    if(e.key == '*'){
        multi.click();
    }

    if(e.key == '/'){
        division.click();
    }

    isSolved();

    if(e.key == '+' ||
    e.key == '-' ||
    e.key == '*' ||
    e.key == '/'){
        return false;
    } else {
        input.value = input.value + e.key;
    }
    
    if (input.value.charAt(0) == '.') {
        input.value = '0' + input.value;
    }

    firstZero();

    checkDot();
})

//event when calculator numbers are clicked
for(e of number){
    e.addEventListener('click', function(){
        eqFieldDisplay()
        isSolved();
        input.value = input.value + this.value;
        firstZero();
    })
}

//event for delete button
del.addEventListener('click', function(){
    deleteNumber();
})

//event for plus button
plus.addEventListener('click', function(){
    action(plus);
})

//event for subtraction button
subtraction.addEventListener('click', function(){
    action(subtraction);
})


//event for division button
division.addEventListener('click', function(){
    action(division);
})

//event for multiplication button
multi.addEventListener('click', function(){
    action(multi);
})

//event for dot button
dot.addEventListener('click', function(){
    input.value += '.';
    checkDot();
    if (input.value.charAt(0) == '.') {
        input.value = '0' + input.value;
    }

    block = 0;
})


//event for reset button
reset.addEventListener('click', function(){
    resetValue();
})

//event for result button
resultValue.addEventListener('click', function(){
    result();
})

//function to evaluate equation
function evil(fn) {
    return new Function('return ' + fn)();
  }

//function to filter keyboard buttons and input letters
function validateFloat(str) {
    let rgx = /^[0-9]*\.*\+*\-*\/*\**?[0-9]*$/;
    return str.match(rgx);
}

//function to get value of input
let getVal = (x) => {
    if(!validateFloat(x.value)){
        x.value = x.value.substring(0, x.value.length - 1);
    }

    if (x.value.charAt(0) == '.') {
        x.value = '0' + x.value;
    }
}

//function for signs buttons 
function action(x){
    if(!input.value){
        return false
    } 

    if(input.value.charAt(input.value.length - 1) == '+' || 
    input.value.charAt(input.value.length - 1) == '-' ||
    input.value.charAt(input.value.length - 1) == '*' ||
    input.value.charAt(input.value.length - 1) == '/'){
        return false;
    }

    equation = input.value + x.value;
    equationField.innerHTML += equation;
    calEq += equation;
    block == 1;
}

//function for 
function eqFieldDisplay() {
    if(equation != ''){
        input.value = '';
        equation = '';
    }
}

//function to check if equation is solved, and clear the field if the button is clicked
function isSolved(){
    if(solved == 1){
        input.value = '';
        eqNum = 0;
        equation = 0; 
        equationField.innerHTML = '';
        calEq = '';
        solved = 0;
    }
}

//function for deleting number in input field
function deleteNumber() {
    if(deleteOff == 1){
        equation = '';
        equationField.innerHTML = '';
        calEq = '';
        deleteOff = 0;
    } else{
        input.value = input.value.substring(0, input.value.length - 1);
    }
}


//function to check if the first letter is dot and to prevent double dots' in input field
function checkDot() {
    if(input.value.split('.').length === 3){
        input.value = input.value.substring(0, input.value.length - 1);
    }
}

//function to reset everything
function resetValue(){
    input.value = '';
    eqNum = 0;
    equation = 0; 
    equationField.innerHTML = '';
    calEq = '';
}

//function to calculate the equation and display it on equation field
function result(){
    equationField.innerHTML += input.value;
    input.value = calEq + input.value;
    input.value = evil(input.value);

    if(input.value === 'undefined'){
        input.value = '';
    }

    eqNum = input.value;
    calEq = 0;

    solved = 1;
    deleteOff = 1;
}

//when the first input is zero
function firstZero(){
    if(input.value.charAt(0) == 0 && input.value.charAt(1) != '.'){
        input.value = input.value.substring(0, input.value.length - 1);
    }
}