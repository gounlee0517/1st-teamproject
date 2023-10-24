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
      const text = document.createElement('p');
      const poster = document.createElement('img');

      item.appendChild(poster)
      item.appendChild(title)
      item.appendChild(text)

      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      title.innerHTML = `${movie.title}`;
      text.innerHTML = `${movie.overview} <br><br>
                        <span>★<br>
                        ${movie.vote_average}</span>`;

      const container = document.getElementsByClassName("container")[0];
      container.appendChild(item)

      //이미지 클릭하면 id alert에 띄우기
      poster.onclick = openImg;

      function openImg(event) {
        event.target.addEventListener('click', () => {
          alert(event.target.textContent = `id : ${movie.id}`);
        })
      }

      item.classList.add('card');
      title.classList.add('title');
      poster.classList.add('poster');

      //card border 스타일 주기 
      item.addEventListener("mouseover", (event) => {
        event.target.style.border = '1px solid #FFCA3D';
        event.target.style.transition = 'all 0.4s ease-in-out';
        
        title.style.border = 'none';
        text.style.border = 'none';
        poster.style.border = 'none';
      }, false);

      item.addEventListener("mouseout", (event) => {
        event.target.style.border = 'none';
      }, false);
    });

    //영화 검색 기능
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('searchBtn');

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });

    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = searchInput.value.toLowerCase();
      const movieCards = document.querySelectorAll('.card');

      movieCards.forEach(card => {
        const title = card.querySelector('.title').textContent.toLowerCase(); // 카드 안의 타이틀 요소 가져오기
        if (title.includes(val)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
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

