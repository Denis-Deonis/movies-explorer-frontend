export const birthDate = {
  birthDate: new Date(1993, 12, 19),
  dateTitles: ["год", "года", "лет"],
};

export const durationTitles = ["минута", "минуты", "минут"];

export const registerFormSetting = {
  type: "register",
  title: "Добро пожаловать!",
  submitText: "Зарегистрироваться",
  transitionText: "Уже зарегистрированы?",
  transitionPath: "/signin",
  transitionLinkText: "Войти",
};

export const loginFormSetting = {
  type: "login",
  title: "Рады видеть!",
  submitText: "Войти",
  transitionText: "Ещё не зарегистрированы?",
  transitionPath: "/signup",
  transitionLinkText: "Регистрация",
};

export const INPUT_ERROR_NAME = {
  name: "Имя не должно быть короче 2 букв",
  email: "Введите корректный email",
  password: "Пароль должен быть не короче 8 символов",
  searchMovies: "Нужно ввести ключевое слово",
};
