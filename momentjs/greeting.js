const greetingForm = document.querySelector('.js-form'),
  input = greetingForm.querySelector('input'),
  greeting = document.querySelector('.js-greetings');

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function paintGreeting(text){
  greetingForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello, ${text}`;
}

function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function handleGreetingSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName(){
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener('submit', handleGreetingSubmit);
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  } else {
    paintGreeting(currentUser)
  }
}

function greetingInit(){
  loadName();
}
greetingInit();