// añadir una condición en caso de que si en el display aparace "Ans" como operando 1 se pueda sustituir 
// por lo que se presione.
// también en otra condición, que si está en el operando 2 se pueda sustituir por números pero no al revés

const operands = {}
const input = document.querySelector("#input");
const result = document.querySelector("#result")
const containerMaster = document.querySelector(".container-master");
const keysOperands = document.querySelectorAll('.key.operand');
keysOperands.forEach(keyOperand => {
  keyOperand.addEventListener('click', checkKeyOperand);
});
const keysFunc = document.querySelectorAll('.key.func');
keysFunc.forEach(keyFunc => {
  keyFunc.addEventListener('click', checkKeyFunc);
});

clearOperands();

function checkKeyOperand(e) {
  if (!operands.error) {
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
          operands.operator = e.currentTarget.textContent;
          operands.isAnswer = true;
          updateResult(`${calculation()}`);
        }
      }
    }
    else if (e.currentTarget.getAttribute("id")==='equal' && operands.inputs!= '') {
      operands.isAnswer = true;
      updateResult(`${calculation()}`);
      operands.operator = '';
    }
  }
  updateInput();
}

function checkKeyFunc(e) {
  if (e.currentTarget.getAttribute("id")==='clear') {
    clearOperands();
    updateInput();
    updateResult('');
  }
  else if(e.currentTarget.getAttribute("id")==="delete") {
    if (input.textContent != '') {
      deleteOneCharInput();
    }
  }
}

function deleteOneCharInput() {
  if(operands.inputs[1] != '') {
    console.log("operando 2");
    operands.inputs[1] = (operands.inputs[1].length === 1) ? '' : operands.inputs[1].slice(0, -1);
  }
  else if (operands.operator != '') {
    console.log("operacion");
    operands.operator = '';
  }
  else {
    if (operands.isAnswer === true) {
      clearInput();
      return
    }
    else operands.inputs[0] = (operands.inputs[0].length === 1) ? '' : operands.inputs[0].slice(0, -1);
  }
  updateInput();
}

function addCharInput(char, index) {
  operands.inputs[index] += char;
}

function updateResult(answer) {
  if(operands.isAnswer && +answer === '') {
    result.textContent = ''
  }
  else if (operands.isAnswer && isNaN(+answer)) operands.answer = 'Press AC'
  else {
    operands.answer = answer;
    operands.inputs[0] = answer;
    result.textContent = `${Math.round(+operands.answer*10000)/10000}`;
  }
}

function updateInput() {
  let textToShow = '';
  if (operands.error) textToShow = operands.inputs[0];
  else if(operands.inputs[0] === '.') textToShow = '.';
  else {
    textToShow = operands.isAnswer ? 'Ans' : operands.inputs[0]==='' ? '' : `${+operands.inputs[0]}`;
    textToShow += (operands.inputs[0].slice(-1) === '.') ? '.' : '';
    textToShow += operands.operator;
    textToShow += operands.inputs[1];
  }
  input.textContent = textToShow;
}

function clearInput() {
  input.textContent = '';
}

function calculation() {
  let a, b;
  [a, b] = [`${operands.inputs[0]}`, `${operands.inputs[1]}`];
  if (operands.operator === '') return +a;
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
  operands['answer'] = '';
}

function add(a, b) {
  return +a + +b;
}

function subtract(a,b) {
  return +a - +b;
}

function multiply(a, b) {
  if (a == '') {
    operands.error = true;
    return 'Syntax Error'
  }
  return a * b;
}

function divide(a, b) {
  if (a == '') {
    operands.error = true;
    return 'Syntax Error'
  }
  if (+b === 0) {
    operands.error = true;
    return 'Math Error';
  }
  else return a/b;
}

function operate(a, b, operator) {
  if (b==='') {
    operands.error = true;
    return 'Syntax Error';
  }
  if (operator === "×") return multiply(a, b);
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "÷") return divide(a, b);
}
