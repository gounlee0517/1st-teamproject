// 현재 페이지 URL 가져오기
const url = window.location.href;
const movieId = url.split("id=")[1];

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTc5NDcwYzIyM2U2NWU4MzUwOTZmNjRlNzA0MTQwZiIsInN1YiI6IjY1MmYzNzRhMGNiMzM1MTZmZWM5Y2U0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SRyc6umjQRslcbrDGmgDP1YkorROAWFTKq0TBmGnrsg",
  },
};

async function fetchData() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-U`,
      options
    );
    const data = await response.json();

    const titles = data.title;
    const overviews = data.overview;
    const stars = data.vote_average;
    const imgs = data.poster_path;
    const genres = data.genres;
    const dates = data.release_date;
    const dateWithSpace = dates.replace(/-/g, " . ");

    const div = document.createElement("div");
    const title = document.createElement("h1");
    const text = document.createElement("p");
    const img = document.createElement("img");
    const star = document.createElement("h4");
    const release_date = document.createElement("h3");

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
      const decimalPart = number - Math.floor(number);
      if (decimalPart >= 0.5) {
        stars += "☆";
      }
      return stars;
    }

    img.src = `https://image.tmdb.org/t/p/w300${imgs}`;
    title.innerHTML = titles;
    star.innerHTML = `${printStars(stars)}`;
    text.innerHTML = overviews;
    release_date.innerHTML = dateWithSpace;

    genres.forEach((genre, index) => {
      if (index < 3) {
        const genreItem = document.createElement("li");
        genreItem.textContent = genre.name;
        genreList.appendChild(genreItem);
      }
    });

    div.appendChild(title);
    div.appendChild(release_date);
    div.appendChild(star);
    div.appendChild(genreList);
    div.appendChild(text);

    const container = document.getElementsByClassName("container")[0];
    container.appendChild(img);
    container.appendChild(div);
  } catch (error) {
    console.log(error);
  }
}

fetchData();

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
  const reviewId = url.split("id=")[1];

  if (!id || !password || !review) {
    alert("Please fill in all fields");
    return;
  } else if (review.includes("ㅅㅂ", "ㅂㅅ")) {
    alert("욕하면 안돼요...");
    return;
  }

  const userObject = {
    id: id,
    reviewData: { reviewId: reviewId, password: password, review: review },
  };
  localStorage.setItem(id, JSON.stringify(userObject));

  idInput.value = "";
  passwordInput.value = "";
  reviewInput.value = "";
});

for (let i = 0; i < localStorage.length; i++) {
  const id = localStorage.key(i);
  const storedData = JSON.parse(localStorage.getItem(id));
  if (storedData.reviewData.reviewId === movieId) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `🧑 ${id} <br><br> <span>${storedData.reviewData.review}</span>`;
    reviewsList.appendChild(listItem);
  } else {
    console.log("why not working");
  }
}

// Home button
const homeButton = document.querySelector(".nav-top");
homeButton.addEventListener("click", homeBtn);
function homeBtn() {
  history.back();
}

// Scroll animation
document.addEventListener("scroll", onScroll, { passive: true });

function onScroll() {
  const container = document.querySelector(".container");
  const containerHeight = container.clientHeight;
  const scrollposition = pageYOffset;
  const nav = document.querySelector(".navbar");
  const navText = document.querySelector(".navbar-menu");

  if (1 <= scrollposition) {
    nav.style.backgroundColor = "#ffcb3dc1"; // 색상 변경  #4747478e
    navText.style.color = "black";
  } else {
    nav.style.backgroundColor = "#00000000";
    navText.style.color = "#FFCA3D";
  }
}