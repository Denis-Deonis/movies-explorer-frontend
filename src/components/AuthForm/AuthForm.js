import { Link } from "react-router-dom";
import Header from "../Header/Header";
import useFormValidation from "../../hooks/useFormValidator";
import { INPUT_ERROR_NAME } from "../../utils/constants";

export default function AuthForm({
  setting,
  isLoad,
  handleSubmit,
  requestError,
}) {
  const { values, errors, isValid, handleChange } = useFormValidation();

  const handleSubmitForm = (evt) => {
    evt.preventDefault()

    handleSubmit(values);
  };

  return (
    <section className="auth-form">
      <Header theme={{ default: true }} />
      <h2 className="auth-form__title">{setting.title}</h2>
      <form
        id="auth-form"
        className="auth-form__form"
        onSubmit={handleSubmitForm}
      >
        {setting.type === "register" && (
          <div className="auth-form__box">
            <label className="auth-form__input-label">Имя</label>
            <input
              className={`auth-form__input ${
                errors.name ? "auth-form__input_error" : ""
              }`}
              type="text"
              name="name"
              minLength={2}
              maxLength={30}
              onChange={handleChange}
              required
            />
            <span className="auth-form__span-error">
              {errors["name"] ? INPUT_ERROR_NAME["name"] : ""}
            </span>
          </div>
        )}

        <div className="auth-form__box">
          <label className="auth-form__input-label">E-mail</label>
          <input
            className={`auth-form__input ${
              errors.email ? "auth-form__input_error" : ""
            }`}
            type="email"
            name="email"
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            onChange={handleChange}
            required
          />
          <span className="auth-form__span-error">
            {errors["email"] ? INPUT_ERROR_NAME["email"] : ""}
          </span>
        </div>

        <div className="auth-form__box">
          <label className="auth-form__input-label">Пароль</label>
          <input
            className={`auth-form__input ${
              errors.password ? "auth-form__input_error" : ""
            }`}
            type="password"
            name="password"
            minLength={8}
            onChange={handleChange}
            required
          />
          <span className="auth-form__span-error">
            {errors["password"]
              ? INPUT_ERROR_NAME["password"]
              : ""
              ? requestError
              : requestError}
          </span>
        </div>

      </form>

      <div className="auth-form__wrapper">
        <button
          className="auth-form__submit"
          type="submit"
          form="auth-form"
          disabled={isLoad || !isValid ? true : false}
        >
          {setting.submitText}
        </button>
        <div className="auth-form__transition">
          <p className="auth-form__transition-text">{setting.transitionText}</p>
          <Link
            to={setting.transitionPath}
            className="auth-form__transition-link"
          >
            {setting.transitionLinkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
