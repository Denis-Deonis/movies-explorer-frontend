export const convertDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`

  // if (hours > 0) {
  //   return `${hours}ч ${minutes}м`;
  // } else {
    //  return `${minutes}м`
  // }

};


export const convertDurationTitle = (num, titles) => {
  return `${num} ${
    titles[
      num % 10 === 1 && num % 100 !== 11
      ? 0
      : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
      ? 1
      : 2
    ]
  }`
}
