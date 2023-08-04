import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  isLoad,
  moviesList,
  loadList,
  error,
  handleBtnMore,
  handleActionBtn,
}) {
  return (
    <section className="movies-card">
      {isLoad || !moviesList ? (
        <span className="movies-card__loader" />
      ) : error ? (
        <p className="movies-card__error">{error}</p>
      ) : (
        <ul className="movies-card__list">
          {moviesList.map((card) => (
            <MoviesCard
              key={card.movieId || card.id}
              movie={card}
              handleActionBtn={handleActionBtn}
              savedMovieBtn={!!loadList}
            />
          ))}
        </ul>
      )}
      {!isLoad && !!loadList && moviesList.length < loadList.length && (
        <button className="movies-card__more-button" onClick={handleBtnMore}>
          Ещё
        </button>
      )}
    </section>
  );
}
