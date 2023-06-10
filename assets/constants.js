export const moviePage = 'moviePage';
export const movieSearchedName = 'searchMovie';
const apiKey = '04c35731a5ee918f014970082a0088b1';

export const IMGPATH = `https://image.tmdb.org/t/p/w1280`

export const APImain =
  `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

export const APIcartoons =
  `https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=${apiKey}`;

export const APImovies =
  `https://api.themoviedb.org/3/discover/movie?with_genres=878&api_key=${apiKey}`;

export const APIpopular =
  `https://api.themoviedb.org/3/discover/movie?with_genres=28,18&sort_by=revenue.desc&api_key=${apiKey}`;

export const APIsearch =
  `https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=${apiKey}&query=`;


export const APImovie = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
}
