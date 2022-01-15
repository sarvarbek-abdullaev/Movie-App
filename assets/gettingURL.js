const cartoons = document.querySelector('#cartoons');
const movies = document.querySelector('#movies');
const popular = document.querySelector('#popular');
const contact = document.querySelector('#contact');
const main = document.querySelector('#main');

    // Adding elements to page
    if (main) {
        const previousURL = document.URL;
        updateLS(previousURL)
    }
    if (cartoons) {
        const previousURL = document.URL;
        updateLS(previousURL)
    }
    if (movies) {
        const previousURL = document.URL;
        updateLS(previousURL)
    }
    if (popular) {
        const previousURL = document.URL;
        updateLS(previousURL)
    }
    function updateLS(a) {
        const prevURL = [];
        prevURL.push(a);
        localStorage.setItem('prevURL', JSON.stringify(prevURL));
    }