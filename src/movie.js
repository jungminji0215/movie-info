let page = 0;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzIwNmQ4ODg3ZWQ0ZjE4ZWEwNDQ0ZmI5MDY1OGI0ZSIsIm5iZiI6MTcyMTc1OTY4NC45Nzc3MzgsInN1YiI6IjY2NGNkMjUyOGVlN2Y4MWUyZDkzMWJlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bit_BfYDcX4uaWb9vmFwPw9w2f0k92KPL5UR_aNY4fg",
  },
};

/**
 * fetch 로 영화 데이터 조회
 * @returns promise 영화 객체
 */
const getMovieData = async () => {
  let result;
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      options
    );

    result = await response.json();
  } catch (error) {
    console.log(error);
  }

  return result.results;
};

const createMovieCard = (movie) => {
  const card = document.createElement("li");
  card.className = "item-card";
  card.innerHTML = `
      <img class="movie-image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <span>평점: ${movie.vote_average}</span>
    `;

  // 모달
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

const renderMovieCard = (movies) => {
  const cardContainer = document.getElementById("item-container");

  movies.forEach((movie) => {
    cardContainer.appendChild(createMovieCard(movie));
  });
};

export const getMovieCards = async () => {
  page += 1;

  const movies = await getMovieData();

  renderMovieCard(movies);
};
