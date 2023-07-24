import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import Header from "../Header/Header";

export default function Profile() {
  const { name, email } = useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("Submit");
  }

  function handleChange() {
    console.log("Change");
  }

  function handleLogout() {
    console.log("Logout");
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
            <span className="profile__input-label">Имя</span>
            <input
              id="profile-input-name"
              className="profile__input"
              type="text"
              name="profile-input-name"
              placeholder="Имя"
              value={name}
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
