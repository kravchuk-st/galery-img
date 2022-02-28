const form = document.getElementById('form'),
      input = document.getElementById('input'),
      flex = document.querySelector('.flex'),
      search = document.querySelector('.search'),
      close = document.querySelector('.close'),
      searchQuery = document.getElementById('searchQuery'),
      moreBtn = document.querySelector('.more'),
      addImg = document.getElementById('addImg');

let page = 1;

window.addEventListener('load', loadImg);

search.addEventListener('click', function(ev) {
  ev.preventDefault();
  removeImg();
  loadImg();
})

addImg.addEventListener('click', loadImg);

function removeImg () {
  moreBtn.style.display = "none";
  searchQuery.innerHTML = '';
  flex.innerHTML = '';
}

input.addEventListener('keydown', function(ev) {
  if  (ev.key === 'Enter') {
    ev.preventDefault();
    removeImg();
    page = 1;
    loadImg();
  }
})

close.addEventListener('click', (ev) => {
  ev.preventDefault();
  input.value = "";
  search.style.display = "inline-block";
  close.style.display = "none";
  input.focus();
  page = 1;
})

function loadImg () {
  let url = '';
  if (input.value == "") {
    removeImg();
    search.style.display = "inline-block";
    close.style.display = "none";
    url = 'https://api.unsplash.com/search/photos?query=\x22random\x22&per_page=30&client_id=3WpPCmsMiCip2kElqstSmR-fsccqRSrk7I9biUSX5R0';
  } else {
    search.style.display = "none";
    close.style.display = "inline-block";
    searchQuery.innerText = input.value;
    moreBtn.style.display = "inline-block";
    url = `https://api.unsplash.com/search/photos?query=\x22${input.value}\x22&per_page=15&page=${page++}&client_id=3WpPCmsMiCip2kElqstSmR-fsccqRSrk7I9biUSX5R0`;
  }

  fetch(url)
  .then(responce => {
    if (responce.ok) {
      return responce.json();
    } else {
      removeImg();
      alert(`${responce.status}, повторите запрос позже`);
    }
  })
  .then(data => {
    for (let i = 0; i < data.results.length; i++){
      let image = document.createElement("img");
      image.className = "galery-img";
      image.src = `${data.results[i].urls.regular}`;
      image.alt = "Gallery Image";
      image.addEventListener("dblclick", function(){
        window.open(data.results[i].links.download, '_blank');
      })
      flex.append(image);
    }
  }
)}