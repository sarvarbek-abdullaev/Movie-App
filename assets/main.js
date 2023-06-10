import { manageLoader, manageClickBtns, getMovies, renderMovies, manageClickMovieBtns, searchFunction, openMoviePage } from './utils.js';
(() => {
  window.addEventListener('DOMContentLoaded', async () => {
    //  Loader
    manageLoader();

    const page = document.querySelector("[data-page]");
    const pageType = document.querySelector("[data-page]").dataset.page;
    const searchedValueFromLocalStorage = JSON.parse(localStorage.getItem('prevSearchTerm'));

    // Fetch to API
    if (!pageType) return;
    const movies = await getMovies(pageType, searchedValueFromLocalStorage);
    renderMovies(movies, page);

    searchFunction(() => openMoviePage(pageType, "searchMovie"));
    manageClickBtns();
    manageClickMovieBtns(pageType)
  })
})();