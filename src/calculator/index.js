const displayEl = document.querySelector("[data-display]");
const numEls = [...document.querySelectorAll("[data-num]")];
const operatorEls = [...document.querySelectorAll("[data-oper]")];
const equalEl = document.querySelector("[data-equal]");
const clearEl = document.querySelector("[data-clear]");

let acc = 0; // 현재 누적 값
let operand = null; // 피연산자
let operator = null; // 연산 기호
let input = null; // 입력 값

init();

function init(){
  addEvents();
}

function calc(operator) {
  switch (operator) {
    case "+":
      return acc + input;
    case "-":
      return acc - input;
    case "*":
      return acc * input;
    case "/":
      return acc / input;
    default: // operator 없이 input 후 = 누른 경우
      return acc = input;
  }
}

function display() {
  displayEl.innerText = input ? input : parseFloat(acc.toFixed(8)); // 소수점 최대 8자리까지 노출
}

function clear() {
  acc = 0;
  operand = null;
  operator = null;
  input = null;
}

function clearHandler() {
  clear();
  display();
}

function numberHandler(event) {
  const {
    target: {
      dataset: { num }
    }
  } = event;

  if (!input && num === "0") return;
  input = input ? input + num : num;
  input = parseInt(input, 10)

  display();
}

function operatorHandler(event) {
  const {
    target: {
      dataset: { oper }
    }
  } = event;
  if (!acc && !input && !operand) return;
  if (!input) {
    if (operator === oper) return;
    operator = oper;
  } else {
    acc = calc(operator);
    operand = input;
    input = null;
    operator = oper;
    display();
  }
}

function equalHandler() {
  if (!operand && !input) return;
  acc = calc(operator);
  operand = null;
  operator = null;
  input = null;
  display();
}

function addEvents(){
  numEls.forEach((numEl) => numEl.addEventListener("click", numberHandler));
  operatorEls.forEach((operatorEl) =>
    operatorEl.addEventListener("click", operatorHandler)
  );
  equalEl.addEventListener("click", equalHandler);
  clearEl.addEventListener("click", clearHandler);
}