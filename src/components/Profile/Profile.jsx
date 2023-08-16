import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Header from "../Header/Header";

export default function Profile({
  signOut,
  handleUserUpdate,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
	const [isDisabled, setIsDisabled] = useState(true);
  const [isSimilarValues, setIsSimilarValues] = useState(true);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSimilarValues) {
      handleUserUpdate({
        name: name,
        email: email,
      });
      resetForm();
    }
    setIsDisabled(true);
  };

  useEffect(() => {
    let name = true;
    let email = true;
    if (values.name) {
      name = values.name === currentUser.name;
    }
    if (values.email) {
      email = values.email === currentUser.email;
    }
    setIsSimilarValues(name && email);
  }, [values.name, values.email]);

  useEffect(() => {
    if (!isLoading) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser, isLoading]);

  useEffect(() => {
    if (values.name) {
      setName(values.name);
    }
    if (values.email) {
      setEmail(values.email);
    }
  }, [values.name, values.email]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
    }
  }, [currentUser, resetForm]);

  const handleEditButton = () => {
    setIsDisabled(!isDisabled);
  };



  return (
    <div>
      <Header theme={{ default: false }} />
      <section className="profile">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <form
          id="profile__form"
          className="profile__form"
          onSubmit={handleSubmit}
        >
          <label className="profile__input-container">
            <span className="profile__input-label">Имя</span>
            <input
              id="profile-input-name"
              className="profile__input"
              type="text"
              name="profile-input-name"
              placeholder="Имя"
              value={`${values.name ? values.name : name}`}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              required={true}
            />
          </label>
          <span
          className={`profile__input-error ${
            errors.name && "profile__input-error_active"
          }`}
        >
          {errors.name || ""}
        </span>
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
          <span
          className={`profile__input-error profile__input-error_email ${
            errors.email && "profile__input-error_active"
          }`}
        >
          {errors.email || ""}
        </span>
        </form>
        <div className="profile__wrapper">
          <button
            type="submit"
            form="profile__form"
            className="profile__submit"
            onClick={handleEditButton}
            disabled={!isValid || isLoading || isSimilarValues ? true : false}
          >
            {isDisabled ? "Редактировать" : "Отменить"}
          </button>
          <button className="profile__btn-exit" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </div>
  );
}
