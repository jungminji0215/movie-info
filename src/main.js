import { config } from "../utils/config.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${config.token}`,
  },
};

document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  console.log(query);
  const movieCards = document.querySelectorAll(".item-card");

  console.log(movieCards);

  movieCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

/**
 * 카드 생성
 */
function createMovieCard(movie) {
  // 새로운 HTML 요소를 생성
  const card = document.createElement("div");
  card.className = "item-card";

  // 동적으로 생성한 요소의 내부 HTML 콘텐츠를 설정할 수 있다.
  card.innerHTML = `
    <img class="movie-image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.overview}</p>
    <span>Rating: ${movie.vote_average}</span>
  `;
  card.addEventListener("click", () => alert(`Movie ID: ${movie.id}`));
  return card;
}

const getMovieInfo = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );

  let result = await response.json();

  // 실제 영화 정보
  let movies = await result.results;

  // 가져온 영화 정보를 붙일 html 가져오기
  const movieContainer = document.getElementById("item-container");

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    movieContainer.appendChild(card);
  });
};

getMovieInfo();
