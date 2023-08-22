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

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res => this._checkStatusRequest(res));
  };


  getUser(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: "GET",
    })
    .then(res => this._checkStatusRequest(res));
  }

  setUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
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
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
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


    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
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
    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(err => this._checkStatusRequest(err));
  };
}

const mainApi = new MainApi(MAIN_API_SETTING);

export default mainApi;
