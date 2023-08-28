import { DURATION_SHORTMOVIE } from './constants.js';

const selectShortMovies = (movieArr) => {
  const shortMovies = [];

  movieArr.forEach(movie => {
    if (movie.duration < DURATION_SHORTMOVIE) shortMovies.push(movie);
  });

  return shortMovies;
}

export default selectShortMovies;
