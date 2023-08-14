import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./App.css";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";
import Tooltip from "../Tooltip/Tooltip";

import * as api from "../../utils/mainApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();
  const path = window.location.pathname;

  async function checkStatus() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoading(true);
      try {
        const res = await api.getUserInfo();
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          localStorage.removeItem("allMovies");
          navigate(path);
        }
      } catch (err) {
        setIsSuccess(false);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([api.getUserInfo(), api.getSavedMovies()])
        .then(([profileInfo, moviesData]) => {
          setCurrentUser(profileInfo);
          setSavedMovies(
            moviesData
              .filter((movies) => movies.owner === currentUser._id)
              .reverse()
          );
        })
        .catch((err) => {
          setIsSuccess(false);
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  const handleAuthorize = (email, password) => {
    setIsLoading(true);
    api
      .login(email, password)
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

  function closeTooltip() {
    setIsSuccess(true);
    setIsUpdated(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Tooltip isSuccess={isSuccess} onClose={closeTooltip} />
        <Tooltip
          isSuccess={!isUpdated}
          isUpdated={isUpdated}
          onClose={closeTooltip}
        />

        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Main />} />

          <Route
            path="/signup"
            element={
              !currentUser.loggeIn ? <Register /> : <Navigate to="/movies" />
            }
          />

          <Route
            path="/signin"
            element={
              !currentUser.loggeIn ? <Login /> : <Navigate to="/movies" />
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                currentUser={currentUser}
                element={Movies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={<ProtectedRouteElement element={SavedMovies} />}
          />

          <Route
            path="/profile"
            element={<ProtectedRouteElement element={Profile} />}
          />


        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
