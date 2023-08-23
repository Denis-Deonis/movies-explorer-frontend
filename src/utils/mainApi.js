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

  async getRegistrationUser({ name, email, password }) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    });
    return this._checkStatusRequest(res);
  }

  async getAuthorizationUser({ email, password }) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });
    return this._checkStatusRequest(res);
  }

  async getLogoutUser() {
    const res = await fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    });
    return this._checkStatusRequest(res);
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    });
    return this._checkStatusRequest(res);
  };

  async setUserInfo({ name, email }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
      })
    });
    return this._checkStatusRequest(res);
  };

  async getAllSavedMovies() {
    const res = await fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      headers: this._headers
    });
    return this._checkStatusRequest(res);
  };

  async postNewSavedMovie(movieData) {
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

    const res = await fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
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
    });
    return this._checkStatusRequest(res);
  };

  async deleteSavedMovie(movie) {
    const err = await fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
    return this._checkStatusRequest(err);
  };
}

const mainApi = new MainApi(MAIN_API_SETTING);

export default mainApi;
