const weather = document.querySelector('.js-weather');

const WEHATHER_API_KEY = '9e84af8f0c78d3f82698d7750262af94';
const COORDS_LS = 'coords';

async function getWeather(lat, long){
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEHATHER_API_KEY}&units=metric`;
  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     const temp = data.main.temp;
  //     const location = data.name;
  //     printWeather(temp, location);
  //   });
  const res = await fetch(url);
  const data = await res.json();
  const temp = data.main.temp;
  const location = data.name;
  printWeather(temp, location);
}

function printWeather(temp, loc){
  weather.innerText = `${temp}° at ${loc}`;
}

function saveCoords(coords){
  localStorage.setItem(COORDS_LS, JSON.stringify(coords));
}

function handleGeoSucces(position){
  const {latitude, longitude} = position.coords;
  saveCoords({latitude, longitude})
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log('I can not access geo location');
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if (!loadedCoords) {
    askForCoords();
  } else {
    const {latitude, longitude} = JSON.parse(loadedCoords);
    getWeather(latitude, longitude);
  }
}

function weatherInit(){
  loadCoords();
}
weatherInit();
