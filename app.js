function add(numberOne, numberTwo) {
    return numberOne + numberTwo; 
}
function subtract(numberOne, numberTwo) {
    return numberOne - numberTwo;
}
function multiply(numberOne, numberTwo) {
    return numberOne * numberTwo;
}
function divide(numberOne, numberTwo) {
    return numberOne / numberTwo;
}
function operate(operator, numberOne, numberTwo){
    switch(operator) {
        case '+':
            return add(numberOne, numberTwo);
            break;
        case '-':
            return subtract(numberOne, numberTwo);
            break;
        case 'x':
            return multiply(numberOne, numberTwo);
            break;
        case '÷':
            return divide(numberOne, numberTwo);
            break;

    }
}

function handleKeyboardInput(event){
    const enteredChar = event.key;
    //define which inputs ae ok
    if (enteredChar >= 0 && enteredChar < 10) {
        getUserNumberInput(enteredChar);
    }

    switch(enteredChar) {
        case '+':
        case '-':
            orchestrateOperator(enteredChar);
            break;
        case '/':
        case '÷':
            orchestrateOperator('÷');
            break;
        case '*':
        case 'x':
            orchestrateOperator('x');
            break;
        case (enteredChar < 10 && enteredChar >= 0):
            getUserNumberInput(enteredChar);
            break;
        case 'Enter':
        case '=':
            sumUp();
            break;
        case 'Escape':
        case 'Backspace':
            clear();
            break;


    }
}


function getUserNumberInput(inputValue){

    const enteredNumber = inputValue;

    //firstNumberEntered flag is changed to true to indicate an operator has been selected and user is on to second number
    if (!firstNumberEntered) {
        firstNumber += enteredNumber;
        updateDisplay('mainDisplay');
    } else {
        secondNumber += enteredNumber;
        updateDisplay('mainDisplay');

    }  
}

function updateDisplay(displayToUpdate){

    if (displayToUpdate == 'secondaryDisplay') {
        if (secondNumber != '') {
            //display the whole string
            sumDisplay.innerHTML = firstNumber + ' ' + operator + ' ' + secondNumber  + ' = ';
        } else {
            //display up to the operator
            sumDisplay.innerHTML = firstNumber + ' ' + operator + ' ';
        }

    } else if (displayToUpdate == 'mainDisplay') {
        if (!firstNumberEntered) {
            display.innerHTML = firstNumber;
        } else {
            display.innerHTML = secondNumber;
        }    
     
    } else if (displayToUpdate == 'result') {
        display.innerHTML = firstNumber;

    } else if (displayToUpdate == 'clear') {
        display.innerHTML = '';
        sumDisplay.innerHTML = '';
    }

    messages.innerText = '';
}

function orchestrateOperator(enteredOperator){

    //first check that a number has been entered, otherwise kill the function
    if (firstNumber == '') {
        return;
    }

    //if operator is already populated, it looks like the user is trying to chain together a sum 
    if (operator != '' && firstNumber != '') {
     sumUp();   
    }
    
    operator = enteredOperator;

    //update flag to say first number has been entered
    firstNumberEntered = true;

    updateDisplay('secondaryDisplay');
}

function sumUp(){

    //kill if second number is empty to pretend user repeatedly pressing when there is nothing to calculate
    if (secondNumber == '') {
        return;
    }

    if (operator == '/' && secondNumber == 0) {
        handleDivZeroDicks();
        return;
    }

    updateDisplay('secondaryDisplay')

    //call operate with the sum details and store it in firstNumber so it can be used for chain sums
    firstNumber = operate(operator, parseInt(firstNumber), parseInt(secondNumber));
    secondNumber = '';
    updateDisplay('result');
}

function clear(){
    firstNumber = '';
    secondNumber = '';
    operator = '';
    firstNumberEntered = false;
    updateDisplay('clear');
}

function handleDivZeroDicks(){
    const warningMessage = "Ya canae divide by 0 in maths ya fucking balloon. Try again shit eater."
    messages.innerText = warningMessage;
    secondNumber = '';
}

let firstNumber = '';
let secondNumber = '';
let operator = '';
let firstNumberEntered = false;

const numberKeys = document.querySelectorAll('.number-key');
const operatorKeys = document.querySelectorAll('.operator-key');
const display = document.getElementById('number-display');
const sumDisplay = document.getElementById('sum-display');
const sumkey = document.getElementById('equals');
const clearKey = document.getElementById('ac');
const messages = document.getElementById('messages');

numberKeys.forEach(key => key.addEventListener('click', function(){ getUserNumberInput(this.dataset.number) }));
operatorKeys.forEach(key => key.addEventListener('click', function(){ orchestrateOperator(this.innerHTML) }));
sumkey.addEventListener('click', sumUp);
clearKey.addEventListener('click', clear);
window.addEventListener('keydown', handleKeyboardInput);
