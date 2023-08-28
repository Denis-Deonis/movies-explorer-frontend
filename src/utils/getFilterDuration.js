export const getFilterDuratoin = (movies) => {  return movies.filter((movie) => movie.duration < 40);};

export const convertDuration = (dur) => {
  const hours = Math.floor(dur / 60);
  const minutes = dur % 60;
  return `${hours}ч ${minutes}мин`;
};

export const getShortMovies = (Arr) => {
  const shortMovies = [];
  Arr.forEach(movie => {if (movie.duration < 40) {shortMovies.push(movie)}});
  return shortMovies;
}
