import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { API__URL } from '../../utils/constants';

export default function MoviesCard({
  card,
  savedMovies,
  savedMovieList,
  deleteMovieToList,
}) {
  const { pathname } = useLocation();

  const convertTime = (length) => {
    if (length >= 60) {
      return `${Math.floor(length / 60)}ч ${length % 60}м`;
    }
    return `${length}м`;
  };

  const isLiked = useMemo(() => {
    return savedMovies.some((m) => m.movieId === card.id);
  }, [card, savedMovies]);

  function handleLikeMovie() {
    !isLiked ? savedMovieList(card) : deleteMovieToList(card);
  }



  function handleDeleteMovie() {
    return deleteMovieToList(card);
  }

  return (
    <li className="card">
      <a
        className="card__link"
        href={card.trailerLink} target="_blank" rel="noreferrer noopener"
      >
        <img
          className="card__img"
          alt={card.nameRU || card.nameEN}
          src={
            card.image.url
              ? `${API__URL}${card.image.url}`
              : card.image
          }
        />
      </a>
      <div className="card__group">
        <h2 className="card__title">{card.nameRU || card.nameEN}</h2>
        {pathname === "/movies" ? (
          <button
            className={`card__button ${
              isLiked ? 
                "card__button_type_seved"
                : "card__button_type_like"
            }`}
            onClick={handleLikeMovie}
          />
        ) : (
          <button
            className={`card__button card__button_type_delete`}
            onClick={handleDeleteMovie}
          />
        )}
      </div>
      <p className="card__duration">{convertTime(card.duration)}</p>
    </li>
  );
}
