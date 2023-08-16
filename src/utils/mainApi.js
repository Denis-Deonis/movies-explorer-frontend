import { BASE__URL, API__URL } from './constants';

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const signUp = (data) => {
  return fetch(`${BASE__URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};

export const signIn = (data) => {
  return fetch(`${BASE__URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: data.password, email: data.email }),
  })
    .then(getResponse)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    });
};

export const getUserInfo = () => {
  return fetch(`${BASE__URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};

export const updateUserInfo = (data) => {
  return fetch(`${BASE__URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name: data.name, email: data.email }),
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};

export const getSavedMovies = () => {
  return fetch(`${BASE__URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};
export const likeMovie = (data) => {
  return fetch(`${BASE__URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      country: data.country,
      duration: data.duration,
      director: data.director,
      year: data.year,
      description: data.description,
      image: `${API__URL}${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `${API__URL}${data.image.formats.thumbnail.url}`,
      movieId: data.id,
    }),
  }).then(getResponse);
};

export const deleteMovie = (movieId) => {
  return fetch(`${BASE__URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};
