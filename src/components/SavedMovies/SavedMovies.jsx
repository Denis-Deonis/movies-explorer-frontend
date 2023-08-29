import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import {filterDuration} from "../../utils/utils";
import {findMovies} from "../../utils/moviesByQuery";
import getFilterMovie from "../../utils/filterMovieArr";

export default function SavedMovies({
  isLoad,
  setIsLoad,
  saveMovies,
  handleDeleteSaveMovie,
  toggleShortSavedMovie,
  onToggleShortSavedMovie,
  error,
  setError,
}) {
  const [filterList, setFilterList] = useState([]),
    [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    setIsLoad(true);

    if (searchQuery) {
      const findSearchMovies = findMovies(saveMovies, searchQuery);

      setFilterList(
        getFilterMovie(findSearchMovies, false, toggleShortSavedMovie, setError)
      );
    } else {
      setFilterList(
        getFilterMovie(saveMovies, false, toggleShortSavedMovie, setError)
      );
    }

    setIsLoad(false);
  }, [saveMovies, searchQuery, setError, setIsLoad, toggleShortSavedMovie]);

  useEffect(() => {
    setIsLoad(true);
    setError(false);

    if (searchQuery) {
      const findSearchMovies = findMovies(saveMovies, searchQuery);

      setFilterList(
        toggleShortSavedMovie
          ? filterDuration(
              getFilterMovie(
                findSearchMovies,
                false,
                toggleShortSavedMovie,
                setError
              )
            )
          : getFilterMovie(
              findSearchMovies,
              false,
              toggleShortSavedMovie,
              setError
            )
      );
    } else {
      setFilterList(
        getFilterMovie(saveMovies, false, toggleShortSavedMovie, setError)
      );
    }

    setIsLoad(false);
  }, [saveMovies, searchQuery, setError, setIsLoad, toggleShortSavedMovie]);

  return (
    <div className="layout">
      <Header theme={{ default: false }} />
      <SearchForm
        isLoad={isLoad}
        savedMoviesType={true}
        onSubmit={setSearchQuery}
        toggleShortMovie={toggleShortSavedMovie}
        onToggleShortMovie={onToggleShortSavedMovie}
      />
      <MoviesCardList
        isLoad={isLoad}
        moviesList={filterList}
        error={error}
        savedMovieBtn={true}
        handleToggleAction={handleDeleteSaveMovie}
      />
      <Footer />
    </div>
  );
}
