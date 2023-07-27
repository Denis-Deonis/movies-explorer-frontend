import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cardLists, typeCardBtn }) {
  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        {cardLists.map((card) => (
          <MoviesCard
            key={card.movieId}
            movieId={card.movieId}
            duration={card.duration}
            image={card.image}
            name={card.nameRU}
            typeCardBtn={typeCardBtn}
          />
        ))}
      </ul>
      {cardLists.length > 2 && (
        <button className="movies-card__more-btn">Ещё</button>
      )}
    </section>
  );
}
