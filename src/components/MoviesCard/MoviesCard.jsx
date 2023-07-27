import { saveCardList } from "../../utils/saveCardList";
import { durationTitles } from "../../utils/constants";
import getEndLine from "../../utils/getEndLine.js";

export default function MoviesCard({
  movieId,
  duration,
  name,
  image,
  typeCardBtn,
}) {
  const isSavedMovieCard = saveCardList.some(
    (item) => item.movieId === movieId
  );

  function getDuration(duration, durationTitles) {
    return getEndLine(duration, durationTitles);
  }

  return (
    <li className="card">
      <img src={image} alt={name} className="card__img" />
      <div className="card__group">
        <h2 className="card__title">{name}</h2>
        <button
          className={`card__button ${
            !typeCardBtn.save
            ? 'card__button_type_delete'
            : isSavedMovieCard
            ? "card__button_type_seved"
            : "card__button_type_like"
          }`}
        >
        </button>
      </div>
      <p className="card__duration">{getDuration(duration, durationTitles)}</p>
    </li>
  );
}
