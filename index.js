// SessionStorage//
window.onpageshow = function (event) {
  const card = document.getElementsByClassName('card')

  if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
      if (sessionStorage.getItem('DATA')) {
        var a = sessionStorage.getItem('DATA');
        searchInput.value = a;
        captureInput()
      } else {
        fetchData()
      }
    }
  } else if (card.length == 0) {
    fetchData()
  } else if (window.performance && window.performance.navigation.type == 1) {
    fetchData()
  }
}

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
    const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=0350783f5567adba763f73f89851b1f5&sort_by=popularity.desc", options);
    const data = await response.json();

    const results = data.results;

    //영화 카트 붙이기//
    results.forEach((movie, index) => {
      const rank = document.createElement("h3");
      const item = document.createElement("div");
      const title = document.createElement("h4");
      const poster = document.createElement("img");
      const link = document.createElement("a");

      item.appendChild(rank);
      item.appendChild(link);
      item.appendChild(title);
      link.appendChild(poster);

      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      title.innerHTML = `${movie.title}`;
      rank.innerHTML = `No.${index + 1}`;

      const container = document.getElementsByClassName("container")[0];
      container.appendChild(item);

      item.classList.add("card");
      title.classList.add("title");
      poster.classList.add("poster");

      //이미지 링크
      link.href = `detail.html?id=${movie.id}`;
    });
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

// 검색 validation check
const searchInput = document.getElementById("inputBox");
const searchBtn = document.getElementById("searchBtn");

function clearListResults(userInput) {
  console.log(userInput);
  if (userInput == "") {
    console.log("검색값 없음");
    alert("영화 제목을 입력해주세요");
  } else {
    const listResults = document.querySelector(".container");
    while (listResults.firstChild) {
      listResults.removeChild(listResults.firstChild);
    }
  }
}

function captureInput() {
  userInput = searchInput.value;
  sessionStorage.setItem('DATA', userInput)


  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=0350783f5567adba763f73f89851b1f5&query=${userInput}`;
  const listResults = document.querySelector(".container"); // 선택한 목록 요소
  clearListResults(userInput);

  // Make an API request
  fetch(searchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const movies = data.results;
      if (movies.length > 0) {
        movies.forEach((movie) => {
          // 각 영화에 대한 html li 요소 생성하기
          const item = document.createElement("div");
          const title = document.createElement("h4");
          const poster = document.createElement("img");
          const link = document.createElement("a");

          poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`; // 포스터 이미지 URL
          poster.alt = movie.title;
          title.textContent = movie.title;

          item.appendChild(link);
          item.appendChild(title);
          link.appendChild(poster);

          //이미지 링크
          link.href = `detail.html?id=${movie.id}`;

          listResults.appendChild(item); // li 요소를 목록에 추가
        });
      } else {
        console.log("No movies found.");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

searchBtn.addEventListener("click", captureInput);
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    captureInput();
  }
});


//검색 결과를 뒤로가기 해도 보이게



// 헤더 스크롤 애니메이션
document.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
  const title = document.querySelector('.title')
  const titleHeight = title.clientHeight;
  const scrollposition = pageYOffset;
  const nav = document.querySelector('.navbar');
  const navText = document.querySelector('.navbar-menu')

  if (titleHeight <= scrollposition) {
    nav.style.backgroundColor = '#ffcb3dc1' // 색상 변경  #4747478e
    navText.style.color = 'black'
  } else {
    nav.style.backgroundColor = '#00000000'
    navText.style.color = '#FFCA3D'
  };
}


//스크롤 이벤트
document.querySelector(".nav-top").addEventListener("click", function () {
  window.scrollTo(0, 0, window.innerHeight);
});
document.querySelector(".nav-search").addEventListener("click", function () {
  window.scrollTo(0, 800, window.innerHeight);
});
document.querySelector(".nav-movielist").addEventListener("click", function () {
  window.scrollTo(0, 1190, window.innerHeight);
});
document.querySelector(".footer-main").addEventListener("click", function () {
  window.scrollTo(0, 0, window.innerHeight);
});


