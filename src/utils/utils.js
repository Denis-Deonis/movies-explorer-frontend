
export const filterDuration = (movies) => {
  return movies.filter((movie) => movie.duration < 40);
};
