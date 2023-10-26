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
    const dates = data.release_date;
    const dateWithSpace = dates.replace(/-/g, " ");

    console.log(dateWithSpace);

    const div = document.createElement("div");
    const title = document.createElement("h1");
    const text = document.createElement("p");
    const img = document.createElement("img");
    const star = document.createElement("h4");
    const release_date = document.createElement("p");

    const genreList = document.createElement("ul");

    function printStars(number) {
      if (number < 0 || number > 10) {
        console.log("숫자는 0에서 10 사이어야 합니다.");
        return;
      }

      let stars = "";
      for (let i = 0; i < number / 2 - 1; i++) {
        stars += "★";
      }
      console.log(number);
      const decimalPart = number - Math.floor(number);
      console.log(decimalPart);
      if (decimalPart >= 0.5) {
        stars += "☆";
      }
      return stars;
    }

    console.log(printStars(stars));

    img.src = `https://image.tmdb.org/t/p/w300${imgs}`;
    title.innerHTML = titles;
    star.innerHTML = `${printStars(stars)}`;
    console.log(typeof stars);
    text.innerHTML = overviews;
    release_date.innerHTML = dateWithSpace;

    genres.forEach((genre, index) => {
      if (index < 3) {
        console.log("valid");
        const genreItem = document.createElement("li");
        genreItem.textContent = genre.name;
        genreList.appendChild(genreItem);
      }
      // const genreItem = document.createElement("li");
      // genreItem.textContent = genre.name;
      // genreList.appendChild(genreItem);
    });

    div.appendChild(title);
    div.appendChild(star);
    div.appendChild(release_date);
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

//review toggle
const reviewBtn = document.querySelector(".nav-movielist");
const reviewContainer = document.querySelector(".container2");
const review_Input = document.querySelector(".input_section");

reviewBtn.addEventListener("click", () => {
  reviewContainer.classList.toggle("active");
  review_Input.classList.toggle("active");
});

document.querySelector(".nav-movielist").addEventListener("click", function () {
  window.scrollTo(0, 0, window.innerHeight);
});

//////Review Section
const idInput = document.querySelector(".idInput");
const passwordInput = document.querySelector(".passwordInput");
const reviewInput = document.querySelector(".reviewInput");
const submitButton = document.querySelector(".submitButton");
const reviewsList = document.querySelector(".reviews");

submitButton.addEventListener("click", function () {
  const id = idInput.value;
  const password = passwordInput.value;
  const review = reviewInput.value;

  if (!id || !password || !review) {
    alert("Please fill in all fields");
    return;
  }

  const userObject = { password: password, review: review };
  localStorage.setItem(id, JSON.stringify(userObject));

  console.log(id, password, review);

  idInput.value = "";
  passwordInput.value = "";
  reviewInput.value = "";
});

console.log(localStorage.length);

for (let i = 0; i < localStorage.length; i++) {
  const id = localStorage.key(i);
  const storedData = JSON.parse(localStorage.getItem(id));

  if (id && storedData && storedData.review) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `ID: ${id} <br><br> ${storedData.review}`;
    reviewsList.appendChild(listItem);
  } else {
    console.log("why not working");
  }
}
