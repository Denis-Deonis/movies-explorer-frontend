import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { ERROR_MESSAGE } from "../../utils/constants";
import moviesApi from "../../utils/moviesApi";
import {filterDuration} from '../../utils/utils';
import {getVisibleCount} from '../../utils/visibleCount';
import {findMovies} from "../../utils/moviesByQuery";
import getFilterMovie from "../../utils/filterMovieArr";

export default function Movies({
  currentUser,
  isLoad,
  setIsLoad,
  movies,
  setMovies,
  saveMovies,
  setSaveMovies,
  handleDeleteSaveMovie,
  toggleShortMovie,
  onToggleShortMovie,
  error,
  setError,
  handleLike,
  setSavedMoviesInLS,
  savedMoviesInLS,
  searchQuery,
  setSearchQuery
}) {

  const [loadList, setLoadList] = useState([]);
  const typeContainer = getVisibleCount();

  useEffect(() => setError(null), []);

  const handleToggleSaveMovie = (movieData) => {
    if (movieData.isLiked) {
      handleDeleteSaveMovie(movieData);
    } else {
      handleLike(movieData);
    }
  };

    useEffect(() => {
      setSearchQuery(sessionStorage.getItem("query"));
      onToggleShortMovie(JSON.parse(sessionStorage.getItem("shorts")));
      setSavedMoviesInLS(JSON.parse(localStorage.getItem("movies")));
    }, []);

  useEffect(() => {
    if (searchQuery) {
      setIsLoad(true);
      const findMoviesList = findMovies(savedMoviesInLS, searchQuery);
      findMoviesList.forEach((movie) => {
        const savedMovie = saveMovies.find(
          (savedMovie) => savedMovie.movieId === movie.id || savedMovie.id === movie.id
        );
        savedMovie ? (movie.isLiked = true) : (movie.isLiked = false);
      });
      setLoadList( toggleShortMovie ? filterDuration(findMoviesList) : findMoviesList );
      setMovies(
        getFilterMovie(findMoviesList, typeContainer, toggleShortMovie, setError )
      );
      setIsLoad(false);
    }
  }, [currentUser, searchQuery, typeContainer.loadCards, toggleShortMovie]);

  const handleSubmit = (search) => {
    setIsLoad(true);

    if (!savedMoviesInLS) {
      moviesApi
        .getMovies()
        .then((allMoviesArr) => {
          sessionStorage.setItem("query", search);
          sessionStorage.setItem("shorts", toggleShortMovie);
          localStorage.setItem("movies", JSON.stringify(allMoviesArr));
          setSavedMoviesInLS(allMoviesArr);
          setSearchQuery(search);
        })
        .catch(() => setError(ERROR_MESSAGE.tryAgainLater))
        .finally(() => setIsLoad(false));
    } else {
      sessionStorage.setItem("query", search);
      sessionStorage.setItem("shorts", toggleShortMovie);
      setSearchQuery(search);
      setIsLoad(false);
    }
  };

  const handleButtonMore = () => {
    const moreMovies = loadList.slice(
      movies.length,
      movies.length + typeContainer.moreCards
    );
    setMovies([...movies, ...moreMovies]);
  };



  return (
    <div>
      <Header theme={{ default: false }} />
      <SearchForm
        isLoad={isLoad}
        onSubmit={handleSubmit}
        savedSearch={searchQuery}
        toggleShortMovie={toggleShortMovie}
        onToggleShortMovie={onToggleShortMovie}
      />
      <MoviesCardList
        isLoad={isLoad}
        moviesList={movies}
        loadList={loadList}
        error={error}
        handleButtonMore={handleButtonMore}
        handleToggleAction={handleToggleSaveMovie}
      />
      <Footer />
    </div>
  );
}
