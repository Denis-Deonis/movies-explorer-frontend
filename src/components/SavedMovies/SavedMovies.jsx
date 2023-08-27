import { useEffect, useState } from "react";
import findMovies from "../../utils/findMovies";
import selectShortMovies from "../../utils/selectShortMovies";
import getFilterMovie from "../../utils/getFilterMovie";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import mainApi from "../../utils/mainApi";

export default function SavedMovies({
  isLoad,
  setIsLoad,
  saveMovies,
  setSaveMovies,
  toggleShortSavedMovie,
  onToggleShortSavedMovie,
  error,
  setError,
}) {
  const [filterList, setFilterList] = useState([]),
    [searchQuery, setSearchQuery] = useState(null);


    const handleCardDeleteSaveMovie = (cardMovie) => {
      const movieId = cardMovie.movieId || cardMovie.id;
      const movieCardForDelete = saveMovies.find(
        (movie) => movie.movieId === movieId || movie.id === movieId
      );

      mainApi
        .deleteSavedMovie(movieCardForDelete)
        .then(
          setSaveMovies(
            saveMovies.filter((cardItem) => cardItem.movieId !== movieId && cardItem.id !== movieId)
          )
        )
        .catch((err) => console.log(err));
    };

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
          ? selectShortMovies(
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
        handleToggleLike={handleCardDeleteSaveMovie}
      />
      <Footer />
    </div>
  );
}
