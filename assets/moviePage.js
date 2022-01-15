window.addEventListener('DOMContentLoaded', () => {
    //  Loader
    const loader = document.querySelector('.loader')

    setTimeout(() => {
        loader.style.opacity = '0'
        setTimeout(() => {
            loader.style.display = 'none'
        }, 500);
    }, 1500);

    // Fetch to API
    const APImain =
        'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

    const APIcartoons =
        'https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=04c35731a5ee918f014970082a0088b1';

    const APImovies =
        'https://api.themoviedb.org/3/discover/movie?with_genres=878&api_key=04c35731a5ee918f014970082a0088b1';

    const APIpopular =
        'https://api.themoviedb.org/3/discover/movie?with_genres=28,18&sort_by=revenue.desc&api_key=04c35731a5ee918f014970082a0088b1';

    const APIsearch =
        'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&query=';

    const IMGPATH =
        'https://image.tmdb.org/t/p/w1280'

    const moviePage = document.querySelector('#moviePage');
    const form = document.querySelector('#form');
    const search = document.querySelector('.search');


    const prevURL = JSON.parse(localStorage.getItem('prevURL'));
    
    const indexOfClickedBtn = JSON.parse(localStorage.getItem('idOfClickedBtn'));
    
    if (prevURL[0].includes('index')){
        getMovies(APImain);
    }
    if (prevURL[0].includes('cartoons')){
        getMovies(APIcartoons)
    }
    if (prevURL[0].includes('movies')){
        getMovies(APImovies)
    }
    if (prevURL[0].includes('popular')){
        getMovies(APIpopular)
    }
    
    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();
        showingMovie(indexOfClickedBtn);    
        function showingMovie(a) {
                moviePage.classList.add('movie-page-main');
                moviePage.innerHTML = `
                    <div class="wrapper" style="background: url(${IMGPATH + respData.results[a].backdrop_path})">
                        <div class="movie-page">
                            <div class="movie-page-header">
                                <h1 class="name">${respData.results[a].title}</h1>
                                <h1 class="score ${getClassByRate(respData.results[a].vote_average)}">${voteAverage(respData.results[a].vote_average)}</h1>
                            </div>
                            <div class="movie-page-body">
                                <div class="movie-page-body__overview">
                                    <h1>Overview</h1>
                                    <p>
                                    ${respData.results[a].overview}
                                    </p>
                                    <h1>Details</h1>
                                    <ul class="movie-page-body__overview-ul">
                                            <li class="movie-page-body__overview-li">Original language :   ${respData.results[a].original_language}</li>
                                            <li class="movie-page-body__overview-li">Release date <span>: ${respData.results[a].release_date}</span></li>
                                    </ul>
                                </div>
                                <div class="movie-page-body__image">
                                    <img src="${IMGPATH + respData.results[a].poster_path}" alt="${respData.results[a].title}">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

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
    const searchBtnForm = document.querySelector('#search-btn-submit');
    const searchBtn = document.querySelector('#search-btn');
    const searchForm = document.querySelector('#form');
    const logo = document.querySelector('#logo');
    const navBtn = document.querySelector('#nav-btn');
    const closeBtn = document.querySelector('#nav-btn-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('header');

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

            getMovies(APIsearch + searchTerm);

            search.value = '';
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