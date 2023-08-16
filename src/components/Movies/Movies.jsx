import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SHORT_MOVIES_DURATION } from "../../utils/constants";

export default function Movies({ isLoading, savedMovieList, deleteMovieToList, savedMovies, allMovies }) {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("isShort") === "true"
  );

  const [moviesSearch, setMoviesSearch] = useState(
    localStorage.getItem("moviesSearch") || ""
  );

  const [filtredMovies, setFiltredMovies] = useState(
    localStorage.getItem("filtredMovies")
      ? JSON.parse(localStorage.getItem("filtredMovies"))
      : []
  );

  function handleSearchMovies(isChecked) {
    const movies = allMovies.filter((movie) => {
      const filtredMovieInclude =
        movie.nameRU.toLowerCase().includes(moviesSearch.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(moviesSearch.toLowerCase());

      return isChecked
        ? filtredMovieInclude
        : movie.duration < SHORT_MOVIES_DURATION && filtredMovieInclude;
    });

    setFiltredMovies(movies);
    localStorage.setItem("isShort", isChecked.toString());
    localStorage.setItem("filtredMovies", JSON.stringify(movies));
    localStorage.setItem("moviesSearch", moviesSearch);
  }

  useEffect(() => {
    localStorage.setItem("isShort", isChecked.toString());
  }, [isChecked]);

  return (
    <div>
      <Header theme={{ default: false }} />
      <SearchForm
        moviesSearch={moviesSearch}
        setMoviesSearch={setMoviesSearch}
        handleSearchMovies={handleSearchMovies}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      <MoviesCardList
        isLoading={isLoading}
        savedMovieList={savedMovieList}
        savedMovies={savedMovies}
        deleteMovieToList={deleteMovieToList}
        movies={filtredMovies}
        filtredMovies={filtredMovies}
      />
      <Footer />
    </div>
  );
}
