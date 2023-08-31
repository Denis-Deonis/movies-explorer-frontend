import { Link } from "react-router-dom";
import Header from "../Header/Header";
import useFormValidation from "../../hooks/useFormValidator";
import { CHECK_EMAIL, ERROR_INPUT} from "../../utils/constants";

export default function AuthForm({
  isLoad,
  handleSubmit,
  requestError,
  title,
  typeForm,
  submitText,
  transitionText,
  transitionPath,
  transitionLinkText
}) {
  const { values, errors, isValid, handleChange } =
    useFormValidation();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  return (
    <section className="auth-form">
      <Header theme={{ default: true }} />
      <h2 className="auth-form__title">{title}</h2>
      <form
        id="auth-form"
        className="auth-form__form"
        onSubmit={handleSubmitForm}
      >
        {typeForm === "register" && (
          <div className="auth-form__box">
            <label className="auth-form__input-label">Имя</label>
            <input
              className={`auth-form__input ${errors.name ? "auth-form__input_error" : ""}`}
              type="text"
              name="name"
              minLength={2}
              maxLength={30}
              onChange={handleChange}
              required
            />
            <span className="auth-form__span-error">
              {errors["name"] ? ERROR_INPUT["name"] : ""}
            </span>
          </div>
        )}

        <div className="auth-form__box">
          <label className="auth-form__input-label">E-mail</label>
          <input
            className={`auth-form__input ${errors.email ? "auth-form__input_error" : ""}`}
            type="email"
            name="email"
            pattern="^\S+@\S+\.[\S+$]{2,5}"
            onChange={handleChange}
            required
          />
          <span className="auth-form__span-error">
            {errors["email"] ? ERROR_INPUT["email"] : ""}
          </span>
        </div>

        <div className="auth-form__box">
          <label className="auth-form__input-label">Пароль</label>
          <input
            className={`auth-form__input ${errors.password ? "auth-form__input_error" : ""}`}
            type="password"
            name="password"
            minLength={8}
            onChange={handleChange}
            required
          />
          <span className="auth-form__span-error">
            {errors["password"]
              ? ERROR_INPUT["password"]
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
          {submitText}
        </button>
        <div className="auth-form__transition">
          <p className="auth-form__transition-text">{transitionText}</p>
          <Link
            to={transitionPath}
            className="auth-form__transition-link"
          >
            {transitionLinkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
