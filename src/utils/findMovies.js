function findMovies(arrMovies, searchQuery) {
  const newArr = [];

  if (searchQuery) {
    const search = searchQuery.toLowerCase();

    arrMovies.forEach(film => {
      if (~film.nameEN.toLowerCase().indexOf(search) || ~film.nameRU.toLowerCase().indexOf(search)) newArr.push(film)
    });

    return newArr;
  }
}

export default findMovies;
