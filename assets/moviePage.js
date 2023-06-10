import { manageLoader, manageClickBtns, getMovies, renderMoviePage, searchFunction } from './utils.js';
(() => {
  window.addEventListener('DOMContentLoaded', async () => {
    const movieId = JSON.parse(localStorage.getItem('movieId'));
    const movie = await getMovies(null, null, movieId);
    renderMoviePage(movie);

    searchFunction();
    manageLoader();
    manageClickBtns();
  })
})();