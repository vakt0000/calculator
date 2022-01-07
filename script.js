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
  return (b === 0) ? "Math Error" : a/b;
}

function operate(a, b, operator) {
  return operator(a, b);
}

const operands = {
  input: '',
  operator: '',
};

const result = document.querySelector("#result");
const containerMaster = document.querySelector(".container-master");
const keys = document.querySelectorAll(".key");
keys.forEach(key => {
  key.addEventListener('click', dummyFunction);
});


function dummyFunction(e) {
  if (e.currentTarget.classList.contains("number")) {
    operands.input += e.currentTarget.textContent; 
  }
  else if (e.currentTarget.getAttribute("id") === "decimal" && operands.input[operands.input.length-1] != ".") {
    operands.input += e.currentTarget.textContent; 
  }
  else if (e.currentTarget.classList.contains("operator")) {
    if (!isNaN(+operands.input[operands.input.length-1]) || operands.input[operands.input.length-1] === ".") {
      if (operands.operator === '') {
        operands.input += e.currentTarget.textContent;
        operands.operator = e.currentTarget.textContent;
      }
      else {
        let a, b;
        [a, b] = [...operands.input.split(`${operands.operator}`)];
        operands.operator = e.currentTarget.textContent;
        operands.input = `${callOperator(a, b)} ${operands.operator}`;
      }
    }
  }
  result.textContent = `${operands.input}`;
}

function callOperator(a, b) {
  if (operands.operator === "×") return multiply(a,b);
}

function updateResult(expression) {
  result.textContent = `${expression}`;
}