import { MOVIES_API_SETTING } from './config';

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkStatusRequest(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(res.status)
  }

  async getMovies() {
    const res = await fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: this._headers
    });
    return this._checkStatusRequest(res);
  };
}

const moviesApi = new MoviesApi(MOVIES_API_SETTING);

export default moviesApi;
