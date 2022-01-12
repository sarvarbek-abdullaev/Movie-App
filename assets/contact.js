window.addEventListener('DOMContentLoaded', () => {
    //  Loader
    const loader = document.querySelector('.loader')

    setTimeout(() => {
        loader.style.opacity = '0'
        setTimeout(() => {
            loader.style.display = 'none'
        }, 500);
    }, 1500);

    const APIsearch = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&query=';
    const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
    const searchBtnForm = document.querySelector('#search-btn-submit');
    const searchBtn = document.querySelector('#search-btn');
    const searchForm = document.querySelector('#form');
    const logo = document.querySelector('#logo');
    const navBtn = document.querySelector('#nav-btn');
    const closeBtn = document.querySelector('#nav-btn-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('header');
    const contact = document.querySelector('#contact');
    const form = document.querySelector('#form');
    const search = document.querySelector('.search');

    // Adding elements to page
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        searchMovie();
    });
    searchBtnForm.addEventListener('click', (e) => {
        e.preventDefault();
        searchMovie();
    });

    // Function for searching
    function searchMovie() {      
        const searchTerm = search.value;
        if (searchTerm) {
            getMovies(APIsearch+searchTerm);
            
            async function getMovies(url) {
                const resp = await fetch(url);
                const respData = await resp.json();
                contact.innerHTML = '';

                respData.results.forEach(movie => {
                    const {
                        poster_path,
                        title,
                        vote_average,
                        overview,
                    } = movie;
                    const movieEl = document.createElement('div');
                    movieEl.classList.add('movie');
                    movieEl.innerHTML = `
                    <img class="movie-img" src="${IMGPATH + poster_path}" alt="${title}">
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getClassByRate(vote_average)}">${voteAverage(vote_average)}</span>
                    </div>
                    <div class="overview">
                        <h4>Overview:</h4>
                    ${overview}
                    </div>
                `;
                    if (poster_path != null) {
                        contact.appendChild(movieEl);
                    };

                    function voteAverage(result) {
                        switch (result) {
                            default:
                                result;
                                break;
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                                result += '.0'
                                break;
                        }
                        return result;
                    }
                });
            }
            search.value = '';
            }
        }

    function getClassByRate(vote) {
        if (vote >= 8) {
            return 'green'
        } else if (vote >= 5) {
            return "orange"
        } else {
            return 'red'
        }
    }

    searchBtn.addEventListener('click', () => {
        if (searchBtn.classList.contains('hidden')) {
            searchForm.classList.remove('opened');
        } else {
            searchForm.classList.add('opened');
            searchBtn.classList.add('hidden');
            navBtn.classList.add('hidden');
            logo.classList.add('hidden');
            closeBtn.classList.remove('hidden');

            if (logo.classList.contains('hidden')) {
                header.style.justifyContent = 'end';
            } else {
                header.style.justifyContent = 'center';
            }

            if (mobileNav.classList.contains('opened')) {
                mobileNav.classList.remove('opened');
            }
        }
    });
    navBtn.addEventListener('click', () => {
        if (navBtn.classList.contains('hidden')) {

        } else {
            navBtn.classList.add('hidden');
            closeBtn.classList.remove('hidden');
            mobileNav.classList.add('opened')
            disableScroll()
        }
    })
    closeBtn.addEventListener('click', () => {
        if (closeBtn.classList.contains('hdden')) {
            navBtn.classList.remove('hidden');
        } else {
            closeBtn.classList.add('hidden');
            navBtn.classList.remove('hidden')
            mobileNav.classList.remove('opened')
            enableScroll()
            if (searchForm.classList.contains('opened')) {
                searchForm.classList.remove('opened');
                searchBtn.classList.remove('hidden');
                navBtn.classList.remove('hidden');
                logo.classList.remove('hidden');
            }
            if (logo.classList.contains('hidden')) {
                header.style.justifyContent = 'end';
            } else {
                header.style.justifyContent = 'center';
            }
        }
    })

    // Enabling and disabling the scroll for mobile navigation    
    function disableScroll() {
        scrollTop = document.documentElement.scrollTop;
        scrollLeft = document.documentElement.scrollLeft;

        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop)
        };
    }

    function enableScroll() {
        window.onscroll = function () {}
    }
})