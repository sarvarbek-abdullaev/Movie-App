import { IMGPATH, APIsearch, APIcartoons, APImovies, APIpopular, APImain, APImovie } from "./constants.js";

export const manageLoader = () => {
  const loader = document.querySelector('.loader')
  setTimeout(() => {
    loader.style.opacity = '0'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500);
  }, 1500);
}

export const manageClickBtns = () => {
  const searchBtn = document.querySelector('#search-btn');
  const searchForm = document.querySelector('#form');
  const logo = document.querySelector('#logo');
  const navBtn = document.querySelector('#nav-btn');
  const closeBtn = document.querySelector('#nav-btn-close');
  const mobileNav = document.querySelector('.mobile-nav');
  const header = document.querySelector('header');

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
    }
  })
  closeBtn.addEventListener('click', () => {
    if (closeBtn.classList.contains('hdden')) {
      navBtn.classList.remove('hidden');
    } else {
      closeBtn.classList.add('hidden');
      navBtn.classList.remove('hidden')
      mobileNav.classList.remove('opened')
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
}

export const getClassByRate = (vote) => {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return "orange"
  } else {
    return 'red'
  }
}

export const voteAverage = (result) => {
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

export const getMovies = async (page, searchValue, movieId) => {
  let url;
  if (page) {
    switch (page) {
      case 'cartoons':
        url = APIcartoons;
        break;
      case 'movies':
        url = APImovies;
        break;
      case 'popular':
        url = APIpopular;
        break;
      case 'search':
        url = APIsearch + searchValue;
        break;
      default:
        url = APImain;
        break;
    }
  } else {
    url = APImovie(movieId)
  }

  const resp = await fetch(url);
  const respData = await resp.json();
  return respData;
};

export const renderMoviePage = (movie) => {
  const moviePage = document.querySelector('#moviePage');
  moviePage.classList.add('movie-page-main');
  moviePage.innerHTML = `
    <div class="wrapper" style="background: url(${IMGPATH + movie.backdrop_path})">
      <div class="movie-page">
        <div class="movie-page-header">
          <h1 class="name">${movie.title}</h1>
          <h1 class="score ${getClassByRate(movie.vote_average)}">${voteAverage(movie.vote_average).toFixed(1)}</h1>
        </div>
        <div class="movie-page-body">
          <div class="movie-page-body__overview">
            <h1>Overview</h1>
            <p>
            ${movie.overview}
            </p>
            <h1>Details</h1>
            <ul class="movie-page-body__overview-ul">
              <li class="movie-page-body__overview-li">Original language :   ${movie.original_language}</li>
              <li class="movie-page-body__overview-li">Release date <span>: ${movie.release_date}</span></li>
            </ul>
          </div>
          <div class="movie-page-body__image">
            <img src="${IMGPATH + movie.poster_path}" alt="${movie.title}">
          </div>
        </div>
      </div>
    </div>
  `;
}

export const renderMovies = (movies, selector) => {
  selector.innerHTML = '';
  selector.classList.add('padding');

  movies.results.forEach((movie) => {
    const {
      id,
      poster_path,
      title,
      vote_average
    } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img class="movie-img" src="${IMGPATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${voteAverage(vote_average)}</span>
      </div>
      <div class="learn-more">
        <a href="##" data-movie-id="${id}" class="learn-more-btn">Learn more</a>
      </div>
    `;
    selector.appendChild(movieEl);
  });
}

export const handleSearch = (search) => {
  const searchTerm = search.value;

  if (searchTerm) {
    // getMovies(APIsearch + searchTerm);
    const prevSearchTerm = [];
    prevSearchTerm.push(searchTerm);
    localStorage.setItem('prevSearchTerm', JSON.stringify(prevSearchTerm));
    search.value = '';
  }
}

export const manageClickMovieBtns = (pageType) => {
  const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
  learnMoreBtns.forEach((learnMoreBtn) => {
    learnMoreBtn.addEventListener('click', (e) => {
      localStorage.setItem('movieId', JSON.parse(e.target.dataset.movieId));
      openMoviePage(pageType);
    })
  })
}

export const openMoviePage = (pageType, pageToOpen = "moviePage") => {
  location.replace(pageType === "main" ? `assets/html/${pageToOpen}.html` : `${pageToOpen}.html`);
};

export const searchFunction = (callback) => {
  const form = document.querySelector('#form');
  const searchBtnForm = document.querySelector('#search-btn-submit');
  const search = document.querySelector('.search');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSearch(search);
    callback && callback();
  });

  searchBtnForm.addEventListener('click', (e) => {
    e.preventDefault();
    handleSearch(search);
    callback && callback();
  });
}