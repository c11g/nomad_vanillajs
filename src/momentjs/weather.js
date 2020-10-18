const weather = document.querySelector('.js-weather');

const WEHATHER_API_KEY = '9e84af8f0c78d3f82698d7750262af94';

async function getWeather(lat, long){
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEHATHER_API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const temp = data.main.temp;
    const location = data.name;
    printWeather(temp, location);
  } catch (e) {
    weather.innerText = e
  }
}

function printWeather(temp, loc){
  weather.innerText = `${temp}° at ${loc}`;
}

function handleGeoSucces(position){
  const {latitude, longitude} = position.coords;
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log('I can not access geo location');
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function weatherInit(){
  askForCoords();
}
weatherInit();
