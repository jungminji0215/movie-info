import { getMovieCards } from "./movie.js";

export const infinityScroll = () => {
  window.addEventListener("scroll", function () {
    const myScroll = window.scrollY + this.window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (myScroll + 10 >= scrollHeight) {
      getMovieCards();
    }
  });
};
