import { convertDuration } from "../../utils/config";

export default function MoviesCard({
  saved,
  card,
  isSavedMovies,
  onLike,
  onDislike,
  savedMovies,
}) {
  const onButttonClick = () => {
    if (saved) {
      onDislike(savedMovies.filter((m) => m.movieId === card.id)[0]);
    } else {
      onLike(card);
    }
  };

  const onButtonDeleteClick = () => {
    onDislike(card);
  };

  return (
    <li className="card">
      <a
        className="card__link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={
            isSavedMovies
              ? card.image
              : `https://api.nomoreparties.co/${card.image.url}`
          }
          alt={card.nameRU}
          className="card__img"
        />
      </a>
      <div className="card__group">
        <h2 className="card__title">{card.nameRU}</h2>
        {isSavedMovies ? (
          <button
            className={`card__button ${
              isSavedMovies
                ? "card__button_type_delete"
                : saved
                ? "card__button_type_seved"
                : "card__button_type_like"
            }`}
            onClick={onButtonDeleteClick}
          />
        ) : (
          <button
            className={`card__button ${
              !isSavedMovies
                ? "card__button_type_delete"
                : saved
                ? "card__button_type_seved"
                : "card__button_type_like"
            }`}
            onClick={onButttonClick}
          />
        )}
      </div>
      <p className="card__duration">{convertDuration(card.duration)}</p>
    </li>
  );
}
