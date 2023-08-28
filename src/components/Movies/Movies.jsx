import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { ERROR_MESSAGE } from "../../utils/constants";
import moviesApi from "../../utils/moviesApi";
import mainApi from "../../utils/mainApi";
import {findFilterMovie} from "../../utils/utils";
import { getShortMovies } from "../../utils/getFilterDuration";
import getTypeCardList from "../../utils/getTypeCardList";
import getFilterMovie from "../../utils/getFilterMovie";
import { getWindow } from "../../utils/utils";

export default function Movies({
  currentUser,
  isLoad,
  setIsLoad,
  movies,
  setMovies,
  saveMovies,
  setSaveMovies,
  toggleShortMovie,
  onToggleShortMovie,
  handleToggleSaveMovie,
  error,
  setError,
}) {
  const [windowSize, setWindowSize] = useState(getWindow());
  const [searchQuery, setSearchQuery] = useState(null);
  const [loadList, setLoadList] = useState([]);
  const typeMoviesContainer = getTypeCardList(windowSize);
  const [savedMoviesList, setSavedMoviesList] = useState(null);

  useEffect(() => setError(null), []);

  useEffect(() => {
    const handleWindowResize = () => setWindowSize(getWindow());
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [windowSize]);

  useEffect(() => {
    setSearchQuery(sessionStorage.getItem("sQ"));
    onToggleShortMovie(JSON.parse(sessionStorage.getItem("toggleSM")));
    setSavedMoviesList(JSON.parse(localStorage.getItem("movies")));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setIsLoad(true);

      const findList = findFilterMovie(savedMoviesList, searchQuery);

      findList.forEach((movie) => {
        const savedMovie = saveMovies.find(
          (savedMovie) =>
            savedMovie.movieId === movie.id || savedMovie.id === movie.id
        );
        savedMovie ? (movie.isLiked = true) : (movie.isLiked = false);
      });

      setLoadList(
        toggleShortMovie ? getShortMovies(findList) : findList
      );
      setMovies(
        getFilterMovie(
          findList,
          typeMoviesContainer,
          toggleShortMovie,
          setError
        )
      );

      setIsLoad(false);
    }
  }, [currentUser, searchQuery, typeMoviesContainer.loadCards, toggleShortMovie]);

  const handleMovieClickButton = (movieData) => {
    const movieId = movieData.id || movieData.movieId;

    if (movieData.isLiked) {
      movieData.isLiked = false;

      const findMovie = savedMoviesList.find((movie) => movie.id === movieId);
      setMovies((movies) =>
        movies.map((movie) => (movie.movieId === movieId ? findMovie : movie))
      );
      handleToggleSaveMovie(movieData);
    } else {
      mainApi
        .postNewSavedMovie({
          movieDatas: {
            country: movieData.country,
            director: movieData.director,
            duration: movieData.duration,
            year: movieData.year,
            description: movieData.description,
            image: `https://api.nomoreparties.co${movieData.image.url}`,
            trailerLink: movieData.trailerLink,
            nameRU: movieData.nameRU,
            nameEN: movieData.nameEN,
            thumbnail: `https://api.nomoreparties.co${movieData.image.url}`,
            movieId: movieData.id,
          },
        })
        .then((savedMovie) => {
          savedMovie.isLiked = true;
          setMovies((movies) =>
            movies.map((card) =>
              card.id === savedMovie.movieId ? savedMovie : card
            )
          );
          setSaveMovies([...saveMovies, savedMovie]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleButtonMore = () => {
    const loadMovies = loadList.slice(
      movies.length,
      movies.length + typeMoviesContainer.moreCards
    );

    setMovies([...movies, ...loadMovies]);
  };

  const handleSubmit = (search) => {
    setIsLoad(true);

    if (!savedMoviesList) {
      moviesApi
        .getMovies()
        .then((allMoviesArr) => {
          sessionStorage.setItem("toggleSM", toggleShortMovie);
          sessionStorage.setItem("sQ", search);
          localStorage.setItem("movies", JSON.stringify(allMoviesArr));
          setSavedMoviesList(allMoviesArr);
          setSearchQuery(search);
        })
        .catch(() => setError(ERROR_MESSAGE.tryAgainLater))
        .finally(() => setIsLoad(false));
    } else {
      sessionStorage.setItem("sQ", search);
      sessionStorage.setItem("toggleSM", toggleShortMovie);
      setSearchQuery(search);
      setIsLoad(false);
    }
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
        handleToggleLike={handleMovieClickButton}
      />
      <Footer />
    </div>
  );
}
