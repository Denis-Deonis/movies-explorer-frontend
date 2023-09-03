export const findMovies = (movies, searchQuery) => {
  const newArrMovies = [];
  if (searchQuery) {
    const search = searchQuery.toLowerCase();
    movies.forEach(film => {
      if (~film.nameEN.toLowerCase().indexOf(search) || ~film.nameRU.toLowerCase().indexOf(search)) newArrMovies.push(film)
    });
    return newArrMovies;
  }
};
