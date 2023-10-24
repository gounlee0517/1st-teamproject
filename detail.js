// 현재 페이지 URL 가져오기
const url = window.location.href;
console.log(url);
console.log(typeof url);

const movieId = url.split("id=")[1];
console.log(movieId);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTc5NDcwYzIyM2U2NWU4MzUwOTZmNjRlNzA0MTQwZiIsInN1YiI6IjY1MmYzNzRhMGNiMzM1MTZmZWM5Y2U0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SRyc6umjQRslcbrDGmgDP1YkorROAWFTKq0TBmGnrsg",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-U`, options)
  .then((response) => response.json())

  .then((data) => {
    const ids = data.id;
    const titles = data.title;
    const overviews = data.overview;
    const stars = data.vote_average;
    const imgs = data.poster_path;

    let div = document.createElement("div");
    let title = document.createElement("h1");
    let text = document.createElement("p");
    let img = document.createElement("img");
    let star = document.createElement("h4");

    img.src = `https://image.tmdb.org/t/p/w300${imgs}`;
    title.innerHTML = titles;
    star.innerHTML = stars;
    text.innerHTML = overviews;
    
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(star);
    div.appendChild(text);
    

    const container = document.getElementsByClassName("container")[0];
    container.appendChild(div);
  })

  .catch((err) => console.error(err));