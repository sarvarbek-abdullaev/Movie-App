const cartoons = document.querySelector('#cartoons');
const movies = document.querySelector('#movies');
const popular = document.querySelector('#popular');
const contact = document.querySelector('#contact');
const main = document.querySelector('#main');
const searchMovie = document.querySelector('#searchMovie');

    // Adding elements to page
    if (main) {
        const previousURL = document.URL;
        updateLinkLS(previousURL)
    }
    if (cartoons) {
        const previousURL = document.URL;
        updateLinkLS(previousURL)
    }
    if (movies) {
        const previousURL = document.URL;
        updateLinkLS(previousURL)
    }
    if (popular) {
        const previousURL = document.URL;
        updateLinkLS(previousURL)
    }
    if (searchMovie) {
        const previousURL = document.URL;
        updateLinkLS(previousURL)
    }
    function updateLinkLS(a) {
        const prevURL = [];
        prevURL.push(a);
        localStorage.setItem('prevURL', JSON.stringify(prevURL));
    }