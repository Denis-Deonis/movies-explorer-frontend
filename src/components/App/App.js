import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./App.css";
// import mainApi from "../../utils/api";
import { STORAGE_DATA_NAME } from "../../utils/constants";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";
import * as api from '../../utils/mainApi';

function App() {
  const navigate = useNavigate(),

    [isLoad, setIsLoad] = useState(false),
    [currentUser, setCurrentUser] = useState({}),
    [movies, setMovies] = useState([]),
    [toggleShortMovie, setToggleShortMovie] = useState(false),
    [toggleShortSavedMovie, setToggleShortSavedMovie] = useState(false),
    [saveMovies, setSaveMovies] = useState([]),
    [error, setError] = useState(null),
    [requestError, setRequestError] = useState(null),
    [isLoggedIn, setIsLoggedIn] = useState(false),
    [savedMovies, setSavedMovies] = useState([]),
    [isLoading, setIsLoading] = useState(false),
    [isSuccess, setIsSuccess] = useState(true),
    [isUpdated, setIsUpdated] = useState(false);

  const path = window.location.pathname;

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  async function checkLoggedInStatus() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoading(true);
      try {
        const res = await api.getUserInfo();
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          localStorage.removeItem('allMovies');
          navigate(path);
        }
      } catch (err) {
        setIsSuccess(false);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([api.getUserInfo(), api.getSavedMovies()])
        .then(([profileInfo, moviesData]) => {
          setCurrentUser(profileInfo);
          setSavedMovies(moviesData.filter((x) => x.owner === currentUser._id).reverse());
        })
        .catch((err) => {
          setIsSuccess(false);
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [currentUser._id, isLoggedIn]);

  const handleRegister = (name, email, password) => {
    api
      .register(name, email, password)
      .then(() => {
        handleAuthorize(email, password);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      });
  };

  const handleAuthorize = (email, password) => {
    setIsLoading(true);
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .patchUserInfo(newUserInfo)
      .then((data) => {
        setIsUpdated(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        handleUnauthorized(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUnauthorized(err) {
    if (err === 'Error: 401') {
      handleSignOut();
    }
  }

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('query');
    localStorage.removeItem('shorts');
    localStorage.removeItem('allMovies');
    navigate('/');
  };

  function handleLike(movie) {
    api
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
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        handleUnauthorized(err);
      });
  }

  function handleDislike(movie) {
    console.log(movie);
    api
      .deleteMovie({ id: movie._id })
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== movie._id));
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        handleUnauthorized(err);
      });
  }


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
                // handleDeleteSaveMovie={handleDeleteSaveMovie}
                toggleShortMovie={toggleShortMovie}
                onToggleShortMovie={handleToggleShortMovie}
                error={error}
                setError={setError}

                isLoggedIn={isLoggedIn} savedMovies={savedMovies} onDislike={handleDislike} onLike={handleLike}
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
                // handleDeleteSaveMovie={handleDeleteSaveMovie}
                toggleShortSavedMovie={toggleShortSavedMovie}
                onToggleShortSavedMovie={handleToggleShortSavedMovie}
                error={error}
                setError={setError}

                isLoggedIn={isLoggedIn} savedMovies={savedMovies} onDislike={handleDislike}
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

                onSignOut={handleSignOut} onUpdateUser={handleUpdateUser} isLoggedIn={isLoggedIn} isLoading={isLoading}
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

                  isLoggedIn={isLoggedIn} onAuthorize={handleAuthorize} isLoading={isLoading}
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

                  isLoggedIn={isLoggedIn} onRegister={handleRegister} isLoading={isLoading}
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
