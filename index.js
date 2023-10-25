const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTc5NDcwYzIyM2U2NWU4MzUwOTZmNjRlNzA0MTQwZiIsInN1YiI6IjY1MmYzNzRhMGNiMzM1MTZmZWM5Y2U0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SRyc6umjQRslcbrDGmgDP1YkorROAWFTKq0TBmGnrsg'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => {
    if (!response.ok) {
      throw new Error('네트워크 오류');
    }
    return response.json(); // JSON 데이터 가져오기
  })
  //영화 리스트
  .then(data => {
    const results = data.results;

    //영화 카트 붙이기
    results.forEach(movie => {
      const item = document.createElement("div");
      const title = document.createElement('h4');
      const poster = document.createElement('img');
      const link = document.createElement('a')

      item.appendChild(link)
      item.appendChild(title)
      link.appendChild(poster)
      link.target = '_blank';

      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      title.innerHTML = `${movie.title}`;

      const container = document.getElementsByClassName("container")[0];
      container.appendChild(item)

      item.classList.add('card');
      title.classList.add('title');
      poster.classList.add('poster');

      //이미지 링크
      link.href = `detail.html?id=${movie.id}` 

      //card border 스타일 주기 
      item.addEventListener("mouseover", (event) => {
        event.target.style.border = '1px solid #FFCA3D';
        event.target.style.transition = 'all 0.4s ease-in-out';
        
        title.style.border = 'none';
        poster.style.border = 'none';
        link.style,border = 'none';
      }, false);

      item.addEventListener("mouseout", (event) => {
        event.target.style.border = 'none';
      }, false);
    });
  })

  .catch(error => {
    console.error('오류 발생:', error);
  });


//스크롤 이벤트
document.querySelector('.nav-search').addEventListener('click', function () {
  window.scrollTo(0, 800, window.innerHeight);
})

document.querySelector('.nav-movielist').addEventListener('click', function () {
  window.scrollTo(0, 1220, window.innerHeight);
})

document.querySelector('.footer-main').addEventListener('click', function () {
  window.scrollTo(0, 0, window.innerHeight);
})



// 검색 기능
const searchInput = document.getElementById('inputBox');
const searchBtn = document.getElementById('searchBtn');

function clearListResults(userInput) {
  console.log(userInput);
  if (userInput == "") {
    console.log('검색값 없음');
  } else {
    const listResults = document.querySelector(".container");
    while (listResults.firstChild) {
      listResults.removeChild(listResults.firstChild);
    }
  }


}

function captureInput() {
  userInput = searchInput.value;

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
          const title = document.createElement('h4');
          const poster = document.createElement("img");
          const link = document.createElement('a');

          poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`; // 포스터 이미지 URL
          poster.alt = movie.title;
          title.textContent = movie.title;

          item.appendChild(link); 
          item.appendChild(title);
          link.appendChild(poster);

          //이미지 링크
          link.href = `detail.html?id=${movie.id}` 
          
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
