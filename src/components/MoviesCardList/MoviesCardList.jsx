import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import {
  MOVIES_COUNT_LG,
  MOVIES_COUNT_MD,
  MOVIES_COUNT_SM,
  MOVIES_COUNT_XS,
  MOVIES_INCREMENT_LG,
  MOVIES_INCREMENT_MD,
  MOVIES_INCREMENT_SM,
  SCREE_LG,
  SCREE_MD,
  SCREE_SM,
} from "../../utils/constants";

export default function MoviesCardList({
  savedMovies,
  cards,
  isSavedMovies,
  isLoading,
  isRequestError,
  isNotFound,
  onLike,
  onDislike,
}) {
  const [visibleMovies, setVisibleMovies] = useState(0);
  const path = window.location.pathname;

  const visibleCount = () => {
    const width = window.innerWidth;
    if (width > SCREE_LG) {
      return MOVIES_COUNT_LG;
    } else if (width > SCREE_MD) {
      return MOVIES_COUNT_MD;
    } else if (width > SCREE_SM) {
      return MOVIES_COUNT_SM;
    } else if (width <= SCREE_SM) {
      return MOVIES_COUNT_XS;
    }
  };

  useEffect(() => {
    setVisibleMovies(visibleCount());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleMovies(visibleCount());
    };

    const debouncedHandleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 1000);
    };

    let resizeTimer;
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const handleBtnMore = () => {
    const width = window.innerWidth;
    if (width > SCREE_LG) {
      setVisibleMovies(
        (prevVisibleMovies) => prevVisibleMovies + MOVIES_INCREMENT_LG
      );
    } else if (width > SCREE_MD) {
      setVisibleMovies(
        (prevVisibleMovies) => prevVisibleMovies + MOVIES_INCREMENT_MD
      );
    } else if (width > SCREE_SM) {
      setVisibleMovies(
        (prevVisibleMovies) => prevVisibleMovies + MOVIES_INCREMENT_SM
      );
    } else if (width <= SCREE_SM) {
      setVisibleMovies(
        (prevVisibleMovies) => prevVisibleMovies + MOVIES_INCREMENT_SM
      );
    }
  };

  const getCard = (savedMovies, card) => {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  };

  return (
    <>
      {/* {isNotFound && !isLoading && <>Ничего не найдено</>} */}
      {isRequestError && !isLoading && (
        <>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </>
      )}
      {path === '/saved-movies' ? (
        <>
          <section className="movies-card">
          <ul className="movies-card__list">
                  {cards.map((card) => (
                    <MoviesCard
                      key={isSavedMovies ? card._id : card.id}
                      saved={getCard(savedMovies, card)}
                      cards={cards}
                      card={card}
                      isSavedMovies={isSavedMovies}
                      onLike={onLike}
                      onDislike={onDislike}
                      savedMovies={savedMovies}
                    />
                  ))}
                </ul>
          </section> {cards.length > visibleMovies && (
              <button
                className="movies-card__more-button"
                onClick={handleBtnMore}
              >
                Ещё
              </button>
            )}
          </>
          ) : (
          <>
            <section className="movies-card">
                <ul className="movies-card__list">
                  {cards.slice(0, visibleMovies).map((card) => (
                    <MoviesCard
                      key={isSavedMovies ? card._id : card.id}
                      saved={getCard(savedMovies, card)}
                      cards={cards}
                      card={card}
                      isSavedMovies={isSavedMovies}
                      onLike={onLike}
                      onDislike={onDislike}
                      savedMovies={savedMovies}
                    />
                  ))}
                </ul>
          </section> {cards.length > visibleMovies && (
                <button
                  className="movies-card__more-button"
                  onClick={handleBtnMore}
                >
                  Ещё
                </button>
              )}
          </>
          )
        }

    </>
  );
}
