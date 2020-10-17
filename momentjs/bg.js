const wrap = document.querySelector('.wrap');

const API_KEY = "qC9hbGbqmmL1tzJchmK5EB5DRNaEFx8xnqNjOwuVmPw";

async function getRandomPhoto(){
  const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${API_KEY}`);
  const data = await res.json();
  const imgUrl = data.urls.regular;
  wrap.style.backgroundImage = `url(${imgUrl})`;
}

function bgInit(){
  getRandomPhoto();
}
bgInit();