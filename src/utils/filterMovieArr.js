import {filterDuration} from "./utils"

export default function getFilterMovie(movieArr, typeContainer, toggle, setError) {
  let movieNewArr,
      shorMovietNewArr = filterDuration(movieArr);

  if (!toggle && movieArr.length > typeContainer.loadCards) {
    movieNewArr = movieArr.slice(0, typeContainer.loadCards);
    setError(null);
  } else if (!toggle && movieArr.length < typeContainer.loadCards) {
    movieNewArr = movieArr;
    setError(null);
  } else if (toggle) {
    if (!shorMovietNewArr.length) {
      setError("Ничего не найдено");
      return movieNewArr = [];
    } else if (toggle && shorMovietNewArr.length > typeContainer.loadCards) {
      movieNewArr = shorMovietNewArr.slice(0, typeContainer.loadCards);
      setError(null);
    } else if (toggle && shorMovietNewArr.length < typeContainer.loadCards) {
      movieNewArr = shorMovietNewArr;
      setError(null);
    }
  };

  if (!movieArr.length) {
    setError("Ничего не найдено");
    return movieNewArr = [];
  };

  if (!typeContainer) {
    if (toggle) {
      movieNewArr = shorMovietNewArr;
      setError(null);
    } else if (!toggle) {
      movieNewArr = movieArr;
      setError(null);
    } else {
      setError("Ничего не найдено");
      return movieNewArr;
    }
  };

  return movieNewArr;
}
