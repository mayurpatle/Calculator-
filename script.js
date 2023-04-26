// get all the buttons
const buttons = document.querySelectorAll('button');

// get the calculator display
const display = document.querySelector('.calculator-display h1');

// initialize variables
let operand1 = '';
let operand2 = '';
let operator = null;

// function to update the display
function updateDisplay(value) {
  display.textContent = value;
}

// function to handle number button clicks
function handleNumberClick(value) {
  if (operator === null) {
    operand1 += value;
    updateDisplay(operand1);
  } else {
    operand2 += value;
    updateDisplay(operand2);
  }
}

// function to handle operator button clicks
function handleOperatorClick(value) {
  if (operand1 !== '' && operand2 !== '') {
    calculate();
  }
  operator = value;
}

// function to handle decimal button click
function handleDecimalClick() {
  if (operator === null) {
    if (!operand1.includes('.')) {
      operand1 += '.';
      updateDisplay(operand1);
    }
  } else {
    if (!operand2.includes('.')) {
      operand2 += '.';
      updateDisplay(operand2);
    }
  }
}

// function to handle clear button click
function handleClearClick() {
  operand1 = '';
  operand2 = '';
  operator = null;
  updateDisplay('0');
}

// function to perform the calculation
function calculate() {
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      result = '';
      break;
  }

  operand1 = result.toString();
  operand2 = '';
  operator = null;
  updateDisplay(result);
}

// add event listeners to all the buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.value;
    if (!isNaN(buttonValue)) {
      handleNumberClick(buttonValue);
    } else if (buttonValue === '.') {
      handleDecimalClick();
    } else if (buttonValue === 'C') {
      handleClearClick();
    } else if (buttonValue === '=') {
      calculate();
    } else {
      handleOperatorClick(buttonValue);
    }
  });
});

// add event listener to the document for the "keydown" event
document.addEventListener('keydown', event => {
  if (event.key === 'c' || event.key === 'C') {
    handleClearClick();
  }
});


