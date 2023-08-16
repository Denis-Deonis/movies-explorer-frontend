import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";
import Tooltip from "../Tooltip/Tooltip";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
import * as mainApi from "../../utils/mainApi";
import * as moviesApi from "../../utils/moviesApi";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState("Success");


  function closeAllPopups() {
    setIsInfoPopupOpen(false);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser((userData) => ({
            ...userData,
            name: data.name,
            email: data.email,
            _id: data._id,
          }));
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          signOut();
        });
    } else {
      signOut();
    }
  }, [loggedIn, signOut]);

  useEffect(() => {
    function loadAllMovies() {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((data) => {
          setAllMovies(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    function loadSavedMovies() {
      setIsLoading(true);
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (loggedIn) {
      loadAllMovies();
      loadSavedMovies();
    }
  }, [loggedIn]);

  function savedMovieList(movie) {
    mainApi
      .likeMovie(movie)
      .then((userMovie) => {
        setSavedMovies([userMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        setInfoTitle("Фильм не сохранился! Попробуйте ещё раз");
        setIsInfoPopupOpen(true);
      });
  }

  function deleteMovieToList(movie) {
    const movieToDelete = savedMovies.find(
      (m) => movie.id === m.movieId || movie.movieId === m.movieId
    );
    mainApi
      .deleteMovie(movieToDelete._id)
      .then((removedMovie) => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== removedMovie._id)
        );
      })
      .catch((err) => {
        console.log(err);
        setInfoTitle("Фильм не удалён! Попробуйте ещё раз");
        setIsInfoPopupOpen(true);
      });
  }

  function handleSignUp(data) {
    setIsLoading(true);
    mainApi
      .signUp(data)
      .then((res) => {
        if (res) {
          setInfoTitle("Вы успешно зарегистрировались!");
          handleSignIn(data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setInfoTitle("Не получилось зарегистрироваться! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
        setIsLoading(false);
      });
  }

  function handleSignIn(data) {
    setIsLoading(true);
    mainApi
      .signIn(data)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setInfoTitle("Не получилось войти! Попробуйте ещё раз");
        setIsInfoPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUserUpdate(userData) {
    setIsLoading(true);
    mainApi
      .updateUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        setInfoTitle("Данные успешно обновлены!");
      })
      .catch((err) => {
        console.log(err);
        setInfoTitle("Ошибка при обновлении данных! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoPopupOpen(true);
      });
  }

  function signOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/", { replace: true });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        {/* <Header loggedIn={loggedIn} theme={{ default: true }}/> */}

          <Tooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            infoTitle={infoTitle}
          />

        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  allMovies={allMovies}
                  savedMovieList={savedMovieList}
                  savedMovies={savedMovies}
                  deleteMovieToList={deleteMovieToList}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  savedMovieList={savedMovieList}
                  savedMovies={savedMovies}
                  deleteMovieToList={deleteMovieToList}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  signOut={signOut}
                  handleUserUpdate={handleUserUpdate}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  loggedIn={loggedIn}
                  handleSignUp={handleSignUp}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  loggedIn={loggedIn}
                  handleSignIn={handleSignIn}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
