import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import mainApi from "../../utils/MainApi";
import useFormValidation from "../../hooks/useFormValidator";
import { INPUT_ERROR_NAME, ERROR_MESSAGE } from "../../utils/constants";

export default function Profile({
  isLoad,
  setIsLoad,
  setCurrentUser,
  navigate,
  setClearValues,
}) {
  const { name, email } = useContext(CurrentUserContext),
    { values, setValues, errors, isValid, setIsValid, handleChange } =
      useFormValidation(),
    [responseError, setResponseError] = useState(null),
    [responseSuccess, setResponseSuccess] = useState(null);

  useEffect(() => {
    if (name && email) {
      setValues({
        name: name,
        email: email,
      });
    }
  }, [name, email, setValues]);

  useEffect(() => {
    if (name === values["name"] && email === values["email"]) {
      setIsValid(false);
    }
  }, [email, name, setIsValid, values]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setIsLoad(true);

    mainApi
      .setUserInfo({ name: values["name"], email: values["email"] })
      .then((data) => {
        setCurrentUser({ ...data, loggeIn: true });
        setResponseSuccess("Данные успешно изменены");
        setIsValid(true);
      })
      .catch((err) => setResponseError(ERROR_MESSAGE.repeatedEmail))
      .finally(() => setIsLoad(false));
  };

  const handleLogout = () => {
    mainApi
      .getLogoutUser()
      .then(() => {
        setClearValues();
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header theme={{ default: false }} />
      <section className="profile">
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
        <form
          id="profile__form"
          className="profile__form"
          onSubmit={handleSubmit}
        >
          <label className="profile__input-container">
            <span className="profile__input-label">Имя</span>
            <input
              id="profile-input-name"
              className={`profile__input ${
                errors.name ? "profile__input_error" : ""
              }`}
              type="text"
              name="profile-input-name"
              placeholder="Имя"
              value={values?.name || ""}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              required={true}
            />
          </label>
          <span className="profile__divider" />
          <label className="profile__input-container">
            <span className="profile__input-label">E-mail</span>
            <input
              id="profile-input-name"
              className="profile__input"
              type="email"
              name="profile-input-name"
              placeholder="Имя"
              value={email}
              onChange={handleChange}
              required={true}
            />
          </label>
        </form>
        <div className="profile__wrapper">
          <button
            type="submit"
            form="profile__form"
            className="profile__submit"
          >
            Редактировать
          </button>
          <button className="profile__btn-exit" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </div>
  );
}
