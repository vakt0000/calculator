function add(a, b) {
  return a + b;
}

function subtract(a,b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    operands.error = true;
    return 'Math Error - Press CLEAR';
  }
  else return a/b;
}

function operate(a, b, operator) {
  if (operator === "×") return multiply(a, b);
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "÷") return divide(a, b);
}

const operands = {}
clearOperands();

const result = document.querySelector("#result");
const containerMaster = document.querySelector(".container-master");
const keys = document.querySelectorAll(".key");
keys.forEach(key => {
  key.addEventListener('click', checkKey);
});


function checkKey(e) {
  if (e.currentTarget.getAttribute("id")==='clear') {
    clearOperands();
  }
  if (operands.error) return;
  else {
    if (e.currentTarget.classList.contains("number")) addCharInput(e.currentTarget.textContent);
    else if (e.currentTarget.getAttribute("id") === "decimal" && operands.input[operands.input.length-1] != ".") {
      addCharInput(e.currentTarget.textContent); 
    }
    else if (e.currentTarget.classList.contains("operator")) {
      if (operands.input === '' && e.currentTarget.textContent === '-') {
        addCharInput('-');
      }
      else if (!isNaN(+operands.input[operands.input.length-1]) || operands.input[operands.input.length-1] === ".") {
        if (operands.operator === '') {
          addCharInput(e.currentTarget.textContent);
          operands.operator = e.currentTarget.textContent;
        }
        else if (e.currentTarget.getAttribute("id")==='equal') {
          addCharInput(`${calculation()}`, false);
          operands.operator = '';
        }
        else {
          addCharInput(`${calculation()}`, false);
          operands.operator = e.currentTarget.textContent;
          addCharInput(`${operands.operator}`);
        }
      }
    }
    updateScreen();
  }
}

function addCharInput(char, appendText = true) {
  appendText ? operands.input += char : operands.input = char; 
}

function updateScreen() {
  result.textContent = operands.input ? `${operands.input}` : '0';
}

function calculation() {
  let a, b;
  [a, b] = [...operands.input.split(`${operands.operator}`)];
  return operate(+a, +b, operands.operator);
}

function clearOperands () {
  operands['input'] = '';
  operands['operator'] = '';
  operands['error'] = false;  
}