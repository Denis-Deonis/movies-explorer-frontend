import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./App.css";
import mainApi from '../../utils/mainApi';
import { STORAGE_DATA_NAME } from "../../utils/constants";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";


function App() {
  const navigate = useNavigate(),
    [movies, setMovies] = useState([]),
    [toggleShortMovie, setToggleShortMovie] = useState(false),
    [toggleShortSavedMovie, setToggleShortSavedMovie] = useState(false),
    [saveMovies, setSaveMovies] = useState([]);



    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [requestError, setRequestError] = useState(null);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState({});




  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);

      Promise.all([mainApi.getAllSavedMovies(), mainApi.getUserInfo()])
        .then((res) => {
          const [apiSavedMovie, apiCurrentUser] = res;

          setSaveMovies(apiSavedMovie);

          return apiCurrentUser;
        })
        .then((apiCurrentUser) => {
          setCurrentUser({ ...apiCurrentUser, loggeIn: true });
        })
        .catch(() => localStorage.removeItem(STORAGE_DATA_NAME.userId))
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  const handleDeleteSaveMovie = (movie) => {
    const movieId = movie.movieId || movie.id;
    const movieForDelete = saveMovies.find(
      (movie) => movie.movieId === movieId || movie.id === movieId
    );

    mainApi
      .deleteSavedMovie(movieForDelete)
      .then(
        setSaveMovies(
          saveMovies.filter((c) => c.movieId !== movieId && c.id !== movieId)
        )
      )
      .catch((err) => console.log(err));
  };

  const handleToggleShortMovie = (value) => {
    setToggleShortMovie(value);

    sessionStorage.setItem(STORAGE_DATA_NAME.toggleShortMovie, value);
  };

  const handleToggleShortSavedMovie = (value) => {
    setToggleShortSavedMovie(value);
  };

  const handleToggleIsLoad = (value) => {
    setIsLoading(value);
  };

  const setClearValues = () => {
    const movieArrs = [setMovies, setSaveMovies],
      valueArrs = [setIsLoading, setToggleShortMovie, setError, setRequestError];

    movieArrs.forEach((i) => i([]));
    valueArrs.forEach((i) => i(null));
    setCurrentUser({
      name: "",
      email: "",
      loggeIn: false,
    });

    localStorage.clear(STORAGE_DATA_NAME.userId);
    sessionStorage.clear(STORAGE_DATA_NAME.movies);
    sessionStorage.clear(STORAGE_DATA_NAME.searchQuery);
    sessionStorage.clear(STORAGE_DATA_NAME.toggleShortMovie);
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
