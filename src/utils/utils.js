export const findSavedMovies = (arrMovies, searchQuery) => {
  const newArr = [];

  if (searchQuery) {
    const search = searchQuery.toLowerCase();

    arrMovies.forEach(film => {
      if (~film.nameEN.toLowerCase().indexOf(search) || ~film.nameRU.toLowerCase().indexOf(search)) newArr.push(film)
    });

    return newArr;
  }
}

export const findFilterMovie = (movies, query) => {
  const requestMovies = movies.filter((movie) => {
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const user = query.toLowerCase().trim();
    return movieEn.indexOf(user) !== -1 || movieRu.indexOf(user) !== -1;
  });
  return requestMovies;
};


export const getWindow= () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};
