import { MAIN_API_SETTING, MOVIES_API_SETTING } from './config';


class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  _checkStatusRequest(res) {
    if(res.ok) {
      return res.json()
    }

    return Promise.reject(res.status)
  };

  getRegistrationUser({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
    .then(res => this._checkStatusRequest(res))
  }

  getAuthorizationUser({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => this._checkStatusRequest(res))
  }

  getLogoutUser() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => this._checkStatusRequest(res))
  }

  // getUserInfo() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     credentials: 'include',
  //     headers: this._headers
  //   })
  //   .then(res => this._checkStatusRequest(res));
  // };

  getUser(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
    .then(res => this._checkStatusRequest(res));
  }

  setUserInfo({ name, email }) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
    .then(res => this._checkStatusRequest(res));
  };

  getAllSavedMovies() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    .then(res => this._checkStatusRequest(res));
  };

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

    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: MOVIES_API_SETTING.baseUrl + image.url,
        trailerLink,
        thumbnail: MOVIES_API_SETTING.baseUrl + image.formats.thumbnail.url,
        movieId: id,
        nameRU,
        nameEN,
      })
    })
    .then(res => this._checkStatusRequest(res));
  };

  deleteSavedMovie(movie) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    .then(err => this._checkStatusRequest(err));
  };
}

const mainApi = new MainApi(MAIN_API_SETTING);

export default mainApi;
