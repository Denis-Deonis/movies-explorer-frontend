import { Link, useNavigate,  useLocation } from "react-router-dom";
import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { PATTERN_EMAIL } from "../../utils/constants";

import Header from "../Header/Header";

export default function AuthForm({
  title,
  buttonText,
  toLink,
  link,
  loggedIn,
  onSubmit,
  setting
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
    }
  };

  useEffect(() => {
    if (loggedIn) resetForm();
  }, [loggedIn, resetForm]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/movies", { replace: true });
    }
  }, [navigate, loggedIn]);

  return (
    <section className="auth-form">
      <Header theme={{ default: true }} />

      <h2 className="auth-form__title">{title}</h2>
      <form
        id="auth-form"
        className="auth-form__form"
        onSubmit={handleSubmit}
      >
        {pathname === "/signup" && (
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
              value={values.name || ""}
              onChange={handleChange}
              placeholder="Имя"
              required
              pattern="^[a-zA-Zа-яёА-ЯЁ -]+$"
            />
            <span className="auth-form__span-error">
              {errors.name}
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
            pattern={PATTERN_EMAIL}
            value={values.email || ""}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <span className="auth-form__span-error">
            {errors.email}
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
            value={values.password || ""}
            onChange={handleChange}
            placeholder="Пароль"
            required
          />
          <span className="auth-form__span-error">
            {errors.password}
          </span>
        </div>
      </form>

      <div className="auth-form__wrapper">
        <button
          className="auth-form__submit"
          type="submit"
          form="auth-form"
          disabled={!isValid}
        >
          {buttonText}
        </button>
        <div className="auth-form__transition">
          <p className="auth-form__transition-text">{setting.transitionText}</p>
          <Link
            to={toLink}
            className="auth-form__transition-link"
          >
            {link}
          </Link>
        </div>
      </div>
    </section>
  );
}
