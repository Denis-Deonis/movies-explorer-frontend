const selectShortMovies = (movieArr) => {
  const shortMovies = [];
  movieArr.forEach((movie) => {
    if (movie.duration < 40) shortMovies.push(movie);
  });
  return shortMovies;
};
export default selectShortMovies;
