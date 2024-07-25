import { config } from "../utils/config.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${config.token}`,
  },
};

const searchMovie = () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const movieCards = document.querySelectorAll(".item-card");

  movieCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

document.getElementById("search-button").addEventListener("click", searchMovie);
document.getElementById("search-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMovie();
  }
});

/**
 * 카드 생성
 */
const createMovieCard = (movie) => {
  const card = document.createElement("div");
  card.className = "item-card";

  card.innerHTML = `
    <img class="movie-image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.overview}</p>
    <span>Rating: ${movie.vote_average}</span>
  `;
  card.addEventListener("click", () => alert(`Movie ID: ${movie.id}`));
  return card;
};

const getMovieInfo = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );

  let result = await response.json();

  // 실제 영화 정보
  let movies = await result.results;

  const movieContainer = document.getElementById("item-container");

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    movieContainer.appendChild(card);
  });
};

getMovieInfo();
