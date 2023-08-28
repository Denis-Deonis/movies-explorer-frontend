import { MOVIES_API_SETTING } from "../../utils/config";
import { convertDuration } from '../../utils/duration';

export default function MoviesCard({ movie, handleActionBtn, savedMovieBtn }) {
  const { duration, image, trailerLink, nameRU, isLiked } = movie;

  const handleAction = () =>  handleActionBtn(movie);;

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
          src={image.url ? `${MOVIES_API_SETTING.baseUrl}${image.url}` : image}
          alt={nameRU}
        />
      </a>
      <div className="card__group">
        <h2 className="card__title">{nameRU}</h2>
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
      <p className="card__duration">{convertDuration(duration)}</p>
    </li>
  );
}
