import { MOVIES_URL } from "../../utils/config";
import { convertDuration } from '../../utils/duration';

export default function MoviesCard({ movie, handleToggleAction, savedMovieButton }) {
  const { duration, image, trailerLink, nameRU, isLiked } = movie;

  const handleToggleButton = () =>  handleToggleAction(movie);;

  return (
    <li className="card">
      <a
        className="card__link"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__img"
          src={image.url ? `${MOVIES_URL}${image.url}` : image}
          alt={nameRU}
        />
      </a>
      <div className="card__group">
        <h2 className="card__title">{nameRU}</h2>
        <button
          className={`card__button ${
            !savedMovieButton
              ? "card__button_type_delete"
              : isLiked
              ? "card__button_type_seved"
              : "card__button_type_like"
          }`}
          onClick={handleToggleButton}
        />
      </div>
      <p className="card__duration">{convertDuration(duration)}</p>
    </li>
  );
}
