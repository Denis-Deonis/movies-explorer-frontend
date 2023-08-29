import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./App.css";
import mainApi from '../../utils/mainApi';
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);

  const [savedMoviesInLS, setSavedMoviesInLS] = useState(null);

  const navigate = useNavigate(),

    [toggleShortMovie, setToggleShortMovie] = useState(false),
    [toggleShortSavedMovie, setToggleShortSavedMovie] = useState(false);

    const handleToggleShortSavedMovie = (value) => setToggleShortSavedMovie(value);
    const handleToggleIsLoad = (value) =>  setIsLoading(value);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([mainApi.getAllSavedMovies(), mainApi.getUserInfo()])
        .then((res) => {
          const [dataMovie, dataCurrentUser] = res;
          setSaveMovies(dataMovie);
          setCurrentUser({ ...dataCurrentUser, loggeIn: true });
        })
        .catch(() => localStorage.removeItem("userID"))
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  const handleDeleteSaveMovie  = (movie) => {
    const movieId = movie.movieId || movie.id;
    const movieForDelete = saveMovies.find((movie) => movie.movieId === movieId || movie.id === movieId );
    if (movie.isLiked) {
      movie.isLiked = false;
      const findMovie = savedMoviesInLS.find((movie) => movie.id === movieId);
      setMovies((movies) =>
        movies.map((movie) => (movie.movieId === movieId ? findMovie : movie))
      );
      mainApi
      .deleteSavedMovie(movieForDelete)
      .then( setSaveMovies(saveMovies.filter((item) => item.movieId !== movieId && item.id !== movieId)))
      .catch((err) => console.log(err));
    } else {
      mainApi
      .deleteSavedMovie(movieForDelete)
      .then( setSaveMovies(saveMovies.filter((item) => item.movieId !== movieId && item.id !== movieId)))
      .catch((err) => console.log(err));
    }
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovie({
          movieData: {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailerLink: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
            movieId: movie.id,
          },
        })
        .then((savedMovie) => {
          savedMovie.isLiked = true;
          setMovies((movies) =>
            movies.map((movie) =>
              movie.id === savedMovie.movieId ? savedMovie : movie
            )
          );
          setSaveMovies([...saveMovies, savedMovie]);
        })
        .catch((err) => console.log(err));
  }

  const handleToggleShortMovie = (value) => {
    setToggleShortMovie(value);
    sessionStorage.setItem("shorts", value);
  };

  const setClearValues = () => {
    // const movieArrs = [setMovies, setSaveMovies];
    // const valueArrs = [setIsLoading, setToggleShortMovie, setError, setRequestError];

    // movieArrs.forEach((i) => i([]));
    // valueArrs.forEach((i) => i(null));
    setCurrentUser({
      name: "",
      email: "",
      loggeIn: false,
    });

    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('userID');
    localStorage.removeItem('movies');
    localStorage.removeItem('query');
    localStorage.removeItem('shorts');
    sessionStorage.clear("movies");
    sessionStorage.clear("query");
    sessionStorage.clear("shorts");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Main />} />

          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                isLoad={isLoading}
                setIsLoad={setIsLoading}
                element={Profile}
                setCurrentUser={setCurrentUser}
                navigate={navigate}
                setClearValues={setClearValues}
              />
            }
          />

          <Route
            path="/signup"
            element={
              !currentUser.loggeIn ? (
                <Register
                  isLoad={isLoading}
                  setIsLoad={setIsLoading}
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentUser={setCurrentUser}
                  navigate={navigate}
                  requestError={requestError}
                  setRequestError={setRequestError}
                />
              ) : (
                <Navigate to="/movies" />
              )
            }
          />

          <Route
            path="/signin"
            element={
              !currentUser.loggeIn ? (
                <Login
                  isLoad={isLoading}
                  setIsLoad={setIsLoading}
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentUser={setCurrentUser}
                  navigate={navigate}
                  requestError={requestError}
                  setRequestError={setRequestError}
                />
              ) : (
                <Navigate to="/movies" />
              )
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                currentUser={currentUser}
                isLoad={isLoading}
                setIsLoad={handleToggleIsLoad}
                element={Movies}
                movies={movies}
                setMovies={setMovies}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                handleDeleteSaveMovie={handleDeleteSaveMovie}
                toggleShortMovie={toggleShortMovie}
                onToggleShortMovie={handleToggleShortMovie}
                error={error}
                setError={setError}
                handleLike={handleSaveMovie}
                savedMoviesInLS={savedMoviesInLS}
                setSavedMoviesInLS={setSavedMoviesInLS}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                isLoad={isLoading}
                setIsLoad={handleToggleIsLoad}
                element={SavedMovies}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                handleDeleteSaveMovie={handleDeleteSaveMovie}
                toggleShortSavedMovie={toggleShortSavedMovie}
                onToggleShortSavedMovie={handleToggleShortSavedMovie}
                error={error}
                setError={setError}
              />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
