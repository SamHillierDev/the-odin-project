const display = document.querySelector("output");
const buttons = document.querySelectorAll("button");

let firstNumber = "";
let secondNumber = "";
let operator = null;
let shouldResetDisplay = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Can't divide by 0!";
  }
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

function updateDisplay(value) {
  if (shouldResetDisplay) {
    display.textContent = value;
    shouldResetDisplay = false;
  } else {
    display.textContent =
      display.textContent === "0" ? value : display.textContent + value;
  }
}

function clear() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  operator = null;
}

function deleteLast() {
  display.textContent = display.textContent.slice(0, -1) || "0";
}

function handleButtonClick(e) {
  const button = e.target;
  const value = button.textContent;

  if (!isNaN(value)) {
    if (operator && !secondNumber) shouldResetDisplay = true;
    updateDisplay(value);
  } else if (value === ".") {
    if (!display.textContent.includes(".")) {
      updateDisplay(value);
    }
  } else if (value === "AC") {
    clear();
  } else if (value === "DEL") {
    deleteLast();
  } else if (value === "=") {
    if (firstNumber && operator && display.textContent) {
      secondNumber = display.textContent;
      const result = operate(operator, firstNumber, secondNumber);
      display.textContent = Math.round(result * 1000) / 1000;
      firstNumber = display.textContent;
      secondNumber = "";
      operator = null;
    }
  } else {
    if (!firstNumber) {
      firstNumber = display.textContent;
      operator = value;
      shouldResetDisplay = true;
    } else if (!secondNumber) {
      operator = value;
      shouldResetDisplay = true;
    } else {
      secondNumber = display.textContent;
      const result = operate(operator, firstNumber, secondNumber);
      display.textContent = Math.round(result * 1000) / 1000;
      firstNumber = display.textContent;
      secondNumber = "";
      operator = value;
    }
  }
}

buttons.forEach((button) =>
  button.addEventListener("click", handleButtonClick)
);
