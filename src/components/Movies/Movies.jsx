import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { ERROR_MESSAGE } from "../../utils/constants";
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
  handleToggleSaveMovie,
  toggleShortMovie,
  onToggleShortMovie,
  error,
  setError,
  handleLike
}) {
  const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    ),
    [searchQuery, setSearchQuery] = useState(null),
    [loadList, setLoadList] = useState([]),
    typeContainer = getTypeCardList(windowDimensions),
    [savedMoviesInLS, setSavedMoviesInLS] = useState(null);

    useEffect(() => {
      setSearchQuery(sessionStorage.getItem("query"));
      onToggleShortMovie(JSON.parse(sessionStorage.getItem("shorts")));
      setSavedMoviesInLS(JSON.parse(localStorage.getItem("movies")));
    }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);



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

  const handleMovieBtnClick = (movieData) => {
    const movieId = movieData.id || movieData.movieId;

    if (movieData.isLiked) {
      movieData.isLiked = false;
      handleToggleSaveMovie(movieData);
      const findMovie = savedMoviesInLS.find((movie) => movie.id === movieId);
      setMovies((movies) =>
        movies.map((movie) => (movie.movieId === movieId ? findMovie : movie))
      );
    } else {
      handleLike(movieData)
      // mainApi
      //   .postNewSavedMovie(movieData)
      //   .then((savedMovie) => {
      //     console.log(movieData)
      //     savedMovie.isLiked = true;
      //     setMovies((movies) =>
      //       movies.map((movie) =>
      //         movie.id === savedMovie.movieId ? savedMovie : movie
      //       )
      //     );
      //     setSaveMovies([...saveMovies, savedMovie]);
      //   })
      //   .catch((err) => console.log(err));
    }
  };

  const handleBtnMore = () => {
    const loadedMovies = loadList.slice(
      movies.length,
      movies.length + typeContainer.moreCards
    );

    setMovies([...movies, ...loadedMovies]);
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
        handleToggleAction={handleMovieBtnClick}
      />
      <Footer />
    </div>
  );
}
