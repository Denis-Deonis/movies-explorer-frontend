export const birthDate = {
  birthDate: new Date(1993, 12, 19),
  dateTitles: ["год", "года", "лет"],
};

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
