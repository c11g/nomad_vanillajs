const wrap = document.querySelector('.wrap');

async function getRandomPhoto(){
  const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${config.UNSPLASH_API_KEY}`);
  const data = await res.json();
  const imgUrl = data.urls.regular;
  wrap.style.backgroundImage = `url(${imgUrl})`;
}

function bgInit(){
  getRandomPhoto();
}
bgInit();