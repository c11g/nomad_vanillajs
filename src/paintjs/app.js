const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = [...document.querySelectorAll('.jsColor')];
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const save = document.querySelector('#jsSave');
const clear = document.querySelector('#jsClear');

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;
const INITIAL_STROKE_STYLE = '#2c2c2c';
const INITIAL_LINE_WIDTH = 3;
const FILL_MODE_LABEL = "FILL MODE";
const PAINT_MODE_LABEL = "PAINT MODE";
const OUTPUT_FILE_NAME = "output.png";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let isPainting = false;
let isFillMode = false;

ctx.strokeStyle = INITIAL_STROKE_STYLE;
ctx.lineWidth = INITIAL_LINE_WIDTH;

function stopPainting(){
  isPainting = false;
}

function startPainting(){
  isPainting = true;
}

function onMouseMove(event){
  if(isFillMode) return;
  const x = event.offsetX;
  const y = event.offsetY;
  if(!isPainting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeInput(event){
  const width = event.target.value;
  ctx.lineWidth = width;
}

function handleClickMode(){
  if(isFillMode) {
    mode.innerText = PAINT_MODE_LABEL;
  } else {
    mode.innerText = FILL_MODE_LABEL;
  }
  isFillMode = !isFillMode;
}

function fillCanvas(){
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function handleCanvasClick(){
  if(isFillMode) {
    fillCanvas();
  }
}

function clearCanvas(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function handleSave(){
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = OUTPUT_FILE_NAME;
  link.click();
}

if(canvas){
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
}

if(colors){
  colors.forEach(color => color.addEventListener('click', handleColorClick));
}

if(range){
  range.addEventListener('input', handleRangeInput);
}

if(mode){
  mode.addEventListener('click', handleClickMode);
}

if(clear){
  clear.addEventListener('click', clearCanvas);
}

if(save){
  save.addEventListener('click', handleSave);
}