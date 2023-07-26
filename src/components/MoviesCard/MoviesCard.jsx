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
      <div className="card__header">
        <h2 className="card__title">Name</h2>
        <p className="card__duration">
          {getDuration(duration, durationTitles)}
        </p>
      </div>
      <img src={image} alt={name} className="card__img" />
      <button
        className={`card__btn ${
          !typeCardBtn.save
            ? "card__btn_type_delete"
            : isSavedMovieCard
            ? "card__btn_saved"
            : ""
        }`}
      >
        {!typeCardBtn.save || isSavedMovieCard ? "" : "Сохранить"}
      </button>
    </li>
  );
}
