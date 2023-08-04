import { durationTitles } from "../../utils/constants";
import getEndLine from "../../utils/getEndLine";
import { MOVIES_API } from "../../utils/config";

export default function MoviesCard({ movie, handleActionBtn, savedMovieBtn }) {
  const { duration, image, trailerLink, name, isLiked } = movie;

  const getDuration = (duration, durationTitles) => {
    return getEndLine(duration, durationTitles);
  };

  const handleAction = () => {
    handleActionBtn(movie);
  };

  return (
    <li className="card">
      <a
        className="card__link"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={image.url ? `${MOVIES_API.baseUrl}${image.url}` : image}
          alt={name}
          className="card__img"
        />
      </a>
      <div className="card__group">
        <h2 className="card__title">{name}</h2>
        <button
          className={`card__button ${
            !savedMovieBtn
              ? "card__button_type_delete"
              : isLiked
              ? "card__button_type_seved"
              : "card__button_type_like"
          }`}
          onClick={handleAction}
        />
      </div>
      <p className="card__duration">{getDuration(duration, durationTitles)}</p>
    </li>
  );
}
