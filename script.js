function add (a, b) {
  let result = Number(a) + Number(b);
  result = Math.round((result + Number.EPSILON) * 1000) / 1000;
  return result;
}

function subtract (a, b) {
  let result = Number(a) - Number(b);
  result = Math.round((result + Number.EPSILON) * 1000) / 1000;
  return result;
}

function multiply (a, b) {
  let result = Number(a) * Number(b);
  result = Math.round((result + Number.EPSILON) * 1000) / 1000;
  return result;
}

function divide (a, b) {
  if(b == 0) {
    return "ERROR";
  }
  let result = Number(a) / Number(b);
  result = Math.round((result + Number.EPSILON) * 1000) / 1000;
  return result;
}

function power (a, b) {
  let result = Number(a) ** Number(b);
  result = Math.round((result + Number.EPSILON) * 1000) / 1000;
  return result;
}

function operate (operator, a, b) {
  switch(operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);   
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b); 
    case "^":
      return power(a, b);
    case "=":
      return firstNumber;
    default:
      return 0;
  }
}

const calcHistory = document.querySelector('.calc_history');

const display = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Display can contain max 19 chars.
    if(display.textContent.length >= 19) {
      return 0;
    }
      if(display.textContent === '0') {
        display.textContent = button.textContent;
      } else {
        display.textContent += button.textContent;
      }
  });
});

let operator = '';
let firstNumber = 0;
let secondNumber = 0;
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    switch(button.className.split(" ")[0]) {
      case "btn_power":
        if(firstNumber !== 0) {
          display.textContent = operate(operator, firstNumber, display.textContent);
        }
        operator = '^';
        firstNumber = display.textContent;
        calcHistory.textContent = `${firstNumber} ${operator}`;
        display.textContent = 0;
        break;
      case "btn_divide":
        if(firstNumber !== 0) {
          display.textContent = operate(operator, firstNumber, display.textContent);
        }
        operator = '/';
        calcHistory.textContent = `${firstNumber} ${operator}`;
        display.textContent = 0;
        break;
      case "btn_multiply":
        if(firstNumber !== 0) {
          display.textContent = operate(operator, firstNumber, display.textContent);
        }
        operator = '*';
        firstNumber = display.textContent;
        calcHistory.textContent = `${firstNumber} ${operator}`;
        display.textContent = 0;
        break;
      case "btn_minus":
        if(firstNumber !== 0) {
          display.textContent = operate(operator, firstNumber, display.textContent);
        }
        operator = '-';
        firstNumber = display.textContent;
        calcHistory.textContent = `${firstNumber} ${operator}`;
        display.textContent = 0;
        break;
      case "btn_plus":
        if(firstNumber !== 0) {
          display.textContent = operate(operator, firstNumber, display.textContent);
        }
        operator = '+';
        firstNumber = display.textContent;
        calcHistory.textContent = `${firstNumber} ${operator}`;
        display.textContent = 0;
        break;
      case "btn_equals":
        secondNumber = display.textContent;
        display.textContent = operate(operator, firstNumber, secondNumber);
        operator = '=';
        firstNumber = display.textContent;
        if (calcHistory.textContent !== '') {
          calcHistory.textContent = display.textContent;
        } else {
          calcHistory.textContent += ` ${secondNumber}`;
        }
        break;
    }
  }); 
});

const removeButtons = document.querySelectorAll('.remove');
removeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    switch(button.className.split(" ")[0]) {
      case "btn_remove_all":
        firstNumber = 0;
        lastNumber = 0;
        calcHistory.textContent = "";
        display.textContent = 0;
        break;
      case "btn_remove_last":
        // If display is 0, then remove_last does nothing
        if(display.textContent === 0) {
          return;
        }
        // If display is 1 digit, but is not 0, then change it to 0
        if (display.textContent.length === 1) {
          display.textContent = 0;
          return;
        }
        // If it has more than 1 digit, then remove last number
        display.textContent = display.textContent.slice(0, -1);
        break;
    }
  });
});