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
    const titles = data.title;
    const overviews = data.overview;
    const stars = data.vote_average;
    const imgs = data.poster_path;
    const genres = data.genres;

    let div = document.createElement("div");
    let title = document.createElement("h1");
    let text = document.createElement("p");
    let img = document.createElement("img");
    let star = document.createElement("h4");
    let genreList = document.createElement("ul");

    img.src = `https://image.tmdb.org/t/p/w300${imgs}`;
    title.innerHTML = titles;
    star.innerHTML = `★<br>${stars}`;
    text.innerHTML = overviews;

    genres.forEach((genre) => {
      const genreItem = document.createElement("li");
      genreItem.textContent = genre.name;
      genreList.appendChild(genreItem);
    });

    div.appendChild(title);
    div.appendChild(star);
    div.appendChild(genreList);
    div.appendChild(text);

    const container = document.getElementsByClassName("container")[0];
    container.appendChild(img);
    container.appendChild(div);
  })

  .catch((err) => console.error(err));

//search toggle
const searchBtn = document.querySelector(".nav-search");
const searchContainer = document.querySelector(".input");
const searchInput = document.querySelector(".width");

searchBtn.addEventListener("click", () => {
  searchContainer.classList.toggle("active");
  searchInput.classList.toggle("active");
});

document.querySelector(".nav-movielist").addEventListener("click", function () {
  window.scrollTo(0, 0, window.innerHeight);
});
