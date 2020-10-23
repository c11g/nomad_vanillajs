const wrap = document.querySelector('.wrap');

async function getRandomPhoto(){
  let imgUrl = "./courtney-smith-h3X5J-5orT8-unsplash.jpg"
  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${config.UNSPLASH_API_KEY}`);
    const data = await res.json();
    imgUrl = data.urls.regular;
  } catch(error) {
    console.log(error)
  }
  wrap.style.backgroundImage = `url(${imgUrl})`;
}

function bgInit(){
  getRandomPhoto();
}
bgInit();