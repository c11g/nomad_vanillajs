const body = document.querySelector('body');

const IMAGE_COUNT = 4;

function printImage(imgNumber){
  body.style.backgroundImage = `url(images/${imgNumber}.jpg)`;
  body.style.backgroundSize = `cover`;
}

function genRandomNumber(){
  return Math.ceil(Math.random() * IMAGE_COUNT);
}

function bgInit(){
  const randomNumber = genRandomNumber();
  printImage(randomNumber);
}
bgInit();