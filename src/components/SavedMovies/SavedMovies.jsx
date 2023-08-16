import { useCallback, useMemo, useState } from "react";
import { SHORT_MOVIES_DURATION } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";



export default function SavedMovies({
  isLoading,
  savedMovieList,
  savedMovies,
  deleteMovieToList,
}) {
  const [isChecked, setIsChecked] = useState(true);

  const [moviesSearch, setMoviesSearch] = useState("");

  const [filterString, setFilterString] = useState("");

  const handleSearchMovies = useCallback(async () => {
    setFilterString(moviesSearch);
  }, [moviesSearch]);

  const filtredMovies = useMemo(() => {
    return savedMovies.filter((movie) => {
      const filtredMovieInclude =
        movie.nameRU.toLowerCase().includes(filterString.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(filterString.toLowerCase());
      return isChecked
        ? filtredMovieInclude
        : movie.duration < SHORT_MOVIES_DURATION && filtredMovieInclude;
    });
  }, [filterString, isChecked, savedMovies]);

  return (
    <div className="layout">
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
        filtredMovies={filtredMovies}
        savedMovieList={savedMovieList}
        savedMovies={savedMovies}
        deleteMovieToList={deleteMovieToList}
        handleSearchMovies={handleSearchMovies}
      />
      <Footer />
    </div>
  );
}
