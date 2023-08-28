export const getFilterMovie = (movies, query) => {
  const requestMovies = movies.filter((movie) => {
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const user = query.toLowerCase().trim();
    return movieEn.indexOf(user) !== -1 || movieRu.indexOf(user) !== -1;
  });
  return requestMovies;
};

