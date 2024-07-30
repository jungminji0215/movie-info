const searchWord = (word) => {
  const searchWord = word.toLowerCase();

  const movieCards = document.querySelectorAll(".item-card");

  movieCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(searchWord)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

export const searchMovies = () => {
  // input 자동 커서
  const searchInput = document.querySelector("#search-input");
  searchInput.focus();

  const searchForm = document.querySelector("#search-form");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchWord(searchInput.value);
  });
};
