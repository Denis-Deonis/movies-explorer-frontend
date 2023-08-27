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
import { STORAGE_DATA_NAME } from "../../utils/constants";


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
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
      if (isLoggedIn) {
        setIsLoading(true);

        Promise.all([mainApi.getAllSavedMovies(), mainApi.getUserInfo()])
          .then((res) => {
            const [dataMovies, dataUser] = res;
            setSavedMovies(
              dataMovies
                .filter((movie) => movie.owner === currentUser._id)
                .reverse()
            );
            // setSaveMovies(dataMovies);
            setCurrentUser({ ...dataUser, loggeIn: true });
          })
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
      }
    }, [isLoggedIn]);

    const handleErrorUnauthorized = (err) => {
      if (err.includes('401')) {
        handelClearAllValues();
        navigate('/', { replace: true })
      }
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
      setIsLoading(value);
    };


    function handleLike(movie) {
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
        .then((newMovie) => {
          setSavedMovies([newMovie, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err);
          handleErrorUnauthorized(err);
        });
    }



  function handleDislike(movie) {
    console.log(movie);
    mainApi
      .deleteMovie({ id: movie._id })
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
        handleErrorUnauthorized(err);
      });
  }


  const handelClearAllValues = () => {
    const movieArrs = [setMovies, setSaveMovies],
      valueArrs = [setIsLoading, setToggleShortMovie, setError, setRequestError];

    movieArrs.forEach((i) => i([]));
    valueArrs.forEach((i) => i(null));
    setCurrentUser({
      name: "",
      email: "",
      loggeIn: false,
    });

    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('query');
    localStorage.removeItem('shorts');
    localStorage.removeItem('allMovies');
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
                setClearValues={handelClearAllValues}
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
                isLoggedIn={isLoggedIn} savedMovies={savedMovies} onDislike={handleDislike} onLike={handleLike}
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
