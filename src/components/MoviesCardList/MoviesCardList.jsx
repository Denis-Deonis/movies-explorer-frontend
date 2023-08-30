import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  isLoad,
  moviesList,
  loadList,
  error,
  handleButtonMore,
  handleToggleAction,
}) {

  const checkIsLoad = isLoad || !moviesList;
  const checkTypeof = typeof moviesList !== 'undefined' && moviesList !== null && Object.keys(moviesList).length > 0;

  return (
    <section className="movies-card">
      { checkIsLoad && checkTypeof ? (
        <span className="movies-card__loader" />
      ) : error ? (
        <p className="movies-card__error">{error}</p>
      ) : (
        <ul className="movies-card__list">
          {moviesList.map((card) => (
            <MoviesCard
            key={card.id || card.movieId}
            movie={card}
            handleToggleAction={handleToggleAction}
            savedMovieButton={!!loadList}
            />
          ))}
        </ul>
      )}

    {
      checkTypeof && (
          !isLoad && !!loadList && ( moviesList.length !== 0 ) < loadList.length  && (
          <button className="movies-card__more-button" onClick={handleButtonMore}>
            Ещё
          </button>
      ))
    }

    </section>
  );
}
