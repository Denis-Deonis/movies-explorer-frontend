import { MAIN_API, MOVIES_API } from "./config";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkStatusRequest(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  getRegistrationUser({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((res) => this._checkStatusRequest(res));
  }

  getAuthorizationUser({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._checkStatusRequest(res));
  }

  getLogoutUser() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "GET",
    }).then((res) => this._checkStatusRequest(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatusRequest(res));
  }

  setUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => this._checkStatusRequest(res));
  }

  getAllSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatusRequest(res));
  }

  postNewSavedMovie(movieData) {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      id,
      nameRU,
      nameEN,
    } = movieData;

    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: MOVIES_API.baseUrl + image.url,
        trailerLink,
        thumbnail: MOVIES_API.baseUrl + image.formats.thumbnail.url,
        movieId: id,
        nameRU,
        nameEN,
      }),
    }).then((res) => this._checkStatusRequest(res));
  }

  deleteSavedMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((err) => this._checkStatusRequest(err));
  }
}

const mainApi = new Api(MAIN_API);

export default mainApi;
