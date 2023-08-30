import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import mainApi from "../../utils/mainApi";
import useFormValidation from "../../hooks/useFormValidator";
import { ERROR_MESSAGE, ERROR_INPUT } from "../../utils/constants";

export default function Profile({
  isLoad,
  setIsLoad,
  setCurrentUser,
  navigate,
  setClearValues,
}) {
  const { name, email } = useContext(CurrentUserContext);
  const { values, setValues, errors, isValid, setIsValid, handleChange } =
      useFormValidation();
  const [responseError, setResponseError] = useState(null);
  const [responseSuccess, setResponseSuccess] = useState(null);

  useEffect(() => {
    if (name && email) {
      setValues({
        name: name,
        email: email,
      });
    }
  }, [name, email, setValues]);

  useEffect(() => {
    if (name === values['name'] && email === values['email']) {
      setIsValid(false);
    }
  }, [email, name, setIsValid, values])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoad(true)
    mainApi.setUserInfo({ name: values['name'], email: values['email'], })
      .then(data => {
        setCurrentUser({ ...data, loggeIn: true })
        setResponseSuccess('Данные успешно изменены')
        setIsValid(true)
      })
      .catch(err => setResponseError(ERROR_MESSAGE.repeatedEmail))
      .finally(() => setIsLoad(false))
  };

  const handleLogout = () => {
    mainApi.getLogoutUser()
      .then(() => {
        setClearValues();
        navigate("/", {replace: true});
      })
      .catch(err => console.log(err))
  }

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
            <span
              className={`profile__input-label ${
                errors.name ? "profile__input-label_error" : ""
              }`}
            >
              {errors.name ? ERROR_INPUT.name : "Имя"}
            </span>
            <input
              className={`profile__input ${
                errors.name ? "profile__input_error" : ""
              }`}
              type="text"
              name="name"
              id="profile-input-name"
              placeholder="Имя"
              value={values.name || ""}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              required={true}
            />
          </label>
          <span className="profile__divider" />
          <label className="profile__input-container">
            <span
              className={`profile__input-label ${
                errors.email ? "profile__input-label_error" : ""
              }`}
            >
              {errors.email ? ERROR_INPUT.email : "E-mail"}
            </span>
            <input
              className={`profile__input ${
                errors.email ? "profile__input_error" : ""
              }`}
              type="email"
              name="email"
              id="profile-input-email"
              placeholder="Email"
              value={values.email || ""}
              onChange={handleChange}
              required={true}
            />
          </label>
          <span
            className={`profile__info ${
              responseSuccess
                ? "profile__info_type_success"
                : responseError
                ? "profile__info_type_error"
                : ""
            }`}
          >
            {(responseSuccess ?? "") || (responseError ?? "")}
          </span>
        </form>
        <div className="profile__wrapper">
          <button
            type="submit"
            form="profile__form"
            className="profile__submit"
            disabled={(isLoad || !isValid) ? true : false}
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
