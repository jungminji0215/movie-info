import { config } from "../utils/config.js";

let page = 0;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${config.token}`,
  },
};

/**
 * 무한 스크롤
 */
window.addEventListener("scroll", function () {
  const myScroll = window.scrollY + this.window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  console.log(`myScroll = ${myScroll} scrollHeight = ${scrollHeight}`);

  if (myScroll + 10 >= scrollHeight) {
    getMovieInfo();
  }
});

/**
 * 페이지 로드 시 input 자동 커서
 */
document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("search-input");
  input.focus();
});

/**
 * 검색
 */
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
 * 카드 한 개 생성
 */
const createMovieCard = (movie) => {
  const card = document.createElement("div");
  card.className = "item-card";
  card.innerHTML = `
    <img class="movie-image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <span>평점: ${movie.vote_average}</span>
  `;

  /**
   * 카드 클릭 시 모달
   */
  card.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.className = "modal-container";
    modal.innerHTML = `
    <div class="item-modal">
      <span>Movie ID :  ${movie.id}</span>
      <p>${movie.overview}</p>
   </div>
    `;

    modal.classList.add("show-modal");
    const cardContainer = document.getElementById("container");
    cardContainer.insertBefore(modal, cardContainer.firstChild);

    modal.addEventListener("click", (e) => {
      if (e.target === document.querySelector(".modal-container")) {
        modal.classList.remove("show-modal");
      }
    });
  });

  return card;
};

/**
 * 영화 조회
 */
const getMovieInfo = () => {
  page += 1;
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      const cardContainer = document.getElementById("item-container");
      movies.forEach((movie) => {
        cardContainer.appendChild(createMovieCard(movie));
      });
    });
};

getMovieInfo();
