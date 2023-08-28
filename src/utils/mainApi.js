import { MAIN_API_SETTING } from './config';

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
    });
    return this._checkStatusRequest(res);
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    });
    return this._checkStatusRequest(res);
  };

  async setUserInfo({ name, email }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      })
    });
    return this._checkStatusRequest(res);
  };

  async getAllSavedMovies() {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    return this._checkStatusRequest(res);
  };

  async saveMovie({ movieData }) {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(movieData),
    });
    return this._checkStatusRequest(res);
  };

  async deleteSavedMovie(movie) {
    const err = await fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    return this._checkStatusRequest(err);
  };
}

const mainApi = new MainApi(MAIN_API_SETTING);

export default mainApi;
