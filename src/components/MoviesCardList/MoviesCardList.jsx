import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cardList, typeCardBtn }) {
  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        <MoviesCard
          key={cardList.movieId}
          movieId={cardList.movieId}
          duration={cardList.duration}
          image={cardList.image}
          name={cardList.nameRU}
          typeCardBtn={typeCardBtn}
        />
        {cardList.map((card) => (
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
      {/* {cardList.length > 2 &&
        <button className="movies-card__more-btn">
          Ещё
        </button>} */}

        
      <button className="movies-card__more-btn">Ещё</button>
    </section>
  );
}
