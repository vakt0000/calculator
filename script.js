function add(a, b) {
  return a + b;
}

function subtract(a,b) {
  return a - b;
}

function multiply(a, b) {
  if (a == '') {
    operands.error = true;
    return 'Syntax Error - Press AC'
  }
  return a * b;
}

function divide(a, b) {
  if (a == '') {
    operands.error = true;
    return 'Syntax Error - Press AC'
  }
  if (+b === 0) {
    operands.error = true;
    return 'Math Error - Press AC';
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
  else if (!operands.error) {
    const idx = (operands.operator==='') ? 0 : 1;
    if (e.currentTarget.classList.contains("number")) addCharInput(e.currentTarget.textContent, idx);
    else if ((e.currentTarget.getAttribute('id') === 'decimal') && (!operands.inputs[idx].includes('.'))) {
      addCharInput(e.currentTarget.textContent, idx);    
    } 
    else if (e.currentTarget.classList.contains("operator")) {
      if (operands.inputs[idx] === 0 && e.currentTarget.textContent === '-') {
        addCharInput('-', idx, false);
      }
      else {
        if (operands.inputs[1] === '') {
          operands.operator = e.currentTarget.textContent;
        }
        else {
          addCharInput(`${calculation()}`, 0, false);
          operands.operator = e.currentTarget.textContent;
          operands.isAnswer = true;
        }
      }
    }
    else if (e.currentTarget.getAttribute("id")==='equal' && operands.operator != '') {
      addCharInput(`${calculation()}`, 0, false);
      operands.operator = '';
      operands.isAnswer = true;
    }
  }
  updateScreen();
}

function addCharInput(char, index, appendText = true) {
  appendText ? operands.inputs[index] += char : operands.inputs[index] = char; 
}

function updateScreen() {
  let textToShow = '';
  if (operands.error) textToShow = operands.inputs[0];
  else {
    console.log(operands.inputs[0])
    textToShow = operands.isAnswer ? `${Math.round(+operands.inputs[0]*100)/100}` : operands.inputs[0]==='' ? '' : `${+operands.inputs[0]}`;
    textToShow += (operands.inputs[0].slice(-1) === '.') ? '.' : '';
    textToShow += operands.operator;
    textToShow += operands.inputs[1];
  }
  result.textContent = textToShow;
}

function calculation() {
  let a, b;
  [a, b] = [`${operands.inputs[0]}`, `${operands.inputs[1]}`];
  const resultOperation = operate(a, b, operands.operator);
  if (operands.error===true) return resultOperation;
  operands.inputs[1] = '';
  return resultOperation;
}

function clearOperands () {
  operands['inputs'] = ['', ''];
  operands['operator'] = '';
  operands['error'] = false;
  operands["isAnswer"] = false;
}