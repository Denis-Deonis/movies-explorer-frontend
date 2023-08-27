import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { ERROR_MESSAGE, STORAGE_DATA_NAME } from "../../utils/constants";
import moviesApi from "../../utils/moviesApi";
import mainApi from "../../utils/mainApi";
import findMovies from "../../utils/findMovies";
import selectShortMovies from "../../utils/selectShortMovies";
import getWindowDimensions from "../../utils/getWindowDimensions";
import getTypeCardList from "../../utils/getTypeCardList";
import getFilterMovie from "../../utils/getFilterMovie";

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
  const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    ),
    [searchQuery, setSearchQuery] = useState(null),
    [loadList, setLoadList] = useState([]),
    typeContainer = getTypeCardList(windowDimensions),
    [savedMoviesInLS, setSavedMoviesInLS] = useState(null);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  useEffect(() => {
    setSearchQuery(sessionStorage.getItem(STORAGE_DATA_NAME.searchQuery));
    onToggleShortMovie(
      JSON.parse(sessionStorage.getItem(STORAGE_DATA_NAME.toggleShortMovie))
    );
    setSavedMoviesInLS(
      JSON.parse(localStorage.getItem(STORAGE_DATA_NAME.movies))
    );
  }, []);

  useEffect(() => setError(null), []);

  useEffect(() => {
    if (searchQuery) {
      setIsLoad(true);

      const findMoviesList = findMovies(savedMoviesInLS, searchQuery);

      findMoviesList.forEach((movie) => {
        const savedMovie = saveMovies.find(
          (savedMovie) =>
            savedMovie.movieId === movie.id || savedMovie.id === movie.id
        );
        savedMovie ? (movie.isLiked = true) : (movie.isLiked = false);
      });

      setLoadList(
        toggleShortMovie ? selectShortMovies(findMoviesList) : findMoviesList
      );
      setMovies(
        getFilterMovie(
          findMoviesList,
          typeContainer,
          toggleShortMovie,
          setError
        )
      );

      setIsLoad(false);
    }
  }, [currentUser, searchQuery, typeContainer.loadCards, toggleShortMovie]);

  const handleMovieClickButton = (movieData) => {
    const movieId = movieData.id || movieData.movieId;

    if (movieData.isLiked) {
      movieData.isLiked = false;

      const findMovie = savedMoviesInLS.find((movie) => movie.id === movieId);
      setMovies((movies) =>
        movies.map((movie) => (movie.movieId === movieId ? findMovie : movie))
      );
      handleToggleSaveMovie(movieData)
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

  const handleBtnMore = () => {
    const loadedMovies = loadList.slice(
      movies.length,
      movies.length + typeContainer.moreCards
    );

    setMovies([...movies, ...loadedMovies]);
  };

  const handleSubmit = (search) => {
    setIsLoad(true);

    if (!savedMoviesInLS) {
      moviesApi
        .getMovies()
        .then((allMoviesArr) => {
          sessionStorage.setItem(STORAGE_DATA_NAME.searchQuery, search);
          setSearchQuery(search);

          sessionStorage.setItem(
            STORAGE_DATA_NAME.toggleShortMovie,
            toggleShortMovie
          );

          localStorage.setItem(
            STORAGE_DATA_NAME.movies,
            JSON.stringify(allMoviesArr)
          );
          setSavedMoviesInLS(allMoviesArr);
        })
        .catch(() => setError(ERROR_MESSAGE.tryAgainLater))
        .finally(() => setIsLoad(false));
    } else {
      sessionStorage.setItem(STORAGE_DATA_NAME.searchQuery, search);
      setSearchQuery(search);

      sessionStorage.setItem(
        STORAGE_DATA_NAME.toggleShortMovie,
        toggleShortMovie
      );

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
        handleBtnMore={handleBtnMore}
        handleToggleLike={handleMovieClickButton}
      />
      <Footer />
    </div>
  );
}
