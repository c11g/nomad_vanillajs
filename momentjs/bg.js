const wrap = document.querySelector('.wrap');

const IMAGE_COUNT = 4;

function printImage(imgNumber){
  wrap.style.backgroundImage = `url(images/${imgNumber}.jpg)`;
}

function genRandomNumber(){
  return Math.ceil(Math.random() * IMAGE_COUNT);
}

function bgInit(){
  const randomNumber = genRandomNumber();
  printImage(randomNumber);
}
bgInit();