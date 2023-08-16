export const BASE__URL = "https://api.deonis.nomoredomains.work";
export const API__URL = "https://api.nomoreparties.co/";
export const MOVIES__URL = "https://api.nomoreparties.co/beatfilm-movies";

export const SHORT_MOVIES_DURATION = 40;
export const MIN_BIG_SCREEN_SIZE = 1191;
export const MIN_SMALL_SCREEN_SIZE = 751;
export const CARDS_QUANTITY_DESKTOP = 12;
export const CARDS_QUANTITY_TABLET = 8;
export const CARDS_QUANTITY_MOBILE = 5;
export const CARDS_MORE_DESKTOP = 3;
export  const CARDS_MORE_MOBILE = 2;

export const birthDate = {
  birthDate: new Date(1993, 12, 19),
  dateTitles: ["год", "года", "лет"],
};

export const durationTitles = ["минута", "минуты", "минут"];

export const PATTERN_EMAIL = '[a-z0-9]+@[a-z]+\\.[a-z]{2,5}';

export const REGISTER_FORM_SETTING = {
  type: 'register',
  title: 'Добро пожаловать!',
  submitText: 'Зарегистрироваться',
  transitionText: 'Уже зарегистрированы?',
  transitionPath: '/signin',
  transitionLinkText: 'Войти',
}

export const LOGIN_FORM_SETTING = {
  type: "login",
  title: "Рады видеть!",
  submitText: "Войти",
  transitionText: "Ещё не зарегистрированы?",
  transitionPath: "/signup",
  transitionLinkText: "Регистрация",
};

export const INPUT_ERROR_NAME = {
  name: "Имя не должно быть короче 2 символов",
  email: "Введите корректный email",
  password: "Пароль должен быть не короче 8 символов",
  searchMovies: "Нужно ввести ключевое слово",
};

export const ERROR_MESSAGE = {
  notFound: "Ничего не найдено",
  tryAgainLater:
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
  errorRequest: "Неверный email или пароль",
  repeatedEmail: "Пользователь с таким email уже зарегистрирован",
};

export const STORAGE_DATA_NAME = {
  userId: "uI",
  movies: "movies",
  searchQuery: "sQ",
  toggleShortMovie: "toggleSM",
};
