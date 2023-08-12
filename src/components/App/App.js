import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./App.css";
import mainApi from "../../utils/api";
// import { STORAGE_DATA_NAME } from "../../utils/constants";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";

import {
  ERROR_MESSAGE,
  STORAGE_DATA_NAME,
} from "../../utils/constants";
import  {getRegistrationUser, getAuthorizationUser} from "../../utils/api";

function App() {
  const navigate = useNavigate(),
    userIdInLocalStorage = localStorage.getItem(STORAGE_DATA_NAME.userId),
    [isLoad, setIsLoad] = useState(false),
    [currentUser, setCurrentUser] = useState({
      name: null,
      email: null,
      loggeIn: !!userIdInLocalStorage,
    }),
    [movies, setMovies] = useState([]),
    [toggleShortMovie, setToggleShortMovie] = useState(false),
    [toggleShortSavedMovie, setToggleShortSavedMovie] = useState(false),
    [saveMovies, setSaveMovies] = useState([]),
    [error, setError] = useState(null),
    [requestError, setRequestError] = useState(null);

  useEffect(() => {
    if (userIdInLocalStorage) {
      setIsLoad(true);

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
        .finally(() => setIsLoad(false));
    }
  }, [userIdInLocalStorage]);

  const handleRegister = (userData) => {
  getRegistrationUser(userData)
      .then(() => {
        return getAuthorizationUser(userData);
      })
      .then((data) => {
        const { name, email, _id } = data;

        if (_id) {
          localStorage.setItem(STORAGE_DATA_NAME.userId, data._id);
          setCurrentUser((oldState) => ({ name, email, loggeIn: true }));
          navigate("/movies");
        }
      })
      .catch(() => setRequestError(ERROR_MESSAGE.repeatedEmail))
      .finally(() => setIsLoad(false));
  }

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
    setIsLoad(value);
  };

  const setClearValues = () => {
    const movieArrs = [setMovies, setSaveMovies],
      valueArrs = [setIsLoad, setToggleShortMovie, setError, setRequestError];

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
            path="/movies"
            element={
              <ProtectedRouteElement
                currentUser={currentUser}
                isLoad={isLoad}
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
                isLoad={isLoad}
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

          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                isLoad={isLoad}
                setIsLoad={setIsLoad}
                element={Profile}
                setCurrentUser={setCurrentUser}
                navigate={navigate}
                setClearValues={setClearValues}
              />
            }
          />

          <Route
            path="/signin"
            element={
              !currentUser.loggeIn ? (
                <Login
                  isLoad={isLoad}
                  setIsLoad={setIsLoad}
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
            path="/signup"
            element={
              !currentUser.loggeIn ? (
                <Register
                  isLoad={isLoad}
                  setIsLoad={setIsLoad}
                  setCurrentUser={setCurrentUser}
                  navigate={navigate}
                  requestError={requestError}
                  setRequestError={setRequestError}

                  onRegister={handleRegister} 
                />
              ) : (
                <Navigate to="/movies" />
              )
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
