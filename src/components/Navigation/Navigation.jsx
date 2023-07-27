import { Link } from "react-router-dom";

export default function Navigation({ isOpenBurger }) {
  return (
    <div className={`navigation ${isOpenBurger ? "navigation_active" : ""}`}>
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link to="/" className="navigation__link navigation__link_home">
            Главная
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/movies" className="navigation__link">
            Фильмы
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/saved-movies" className="navigation__link">
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
      <Link to="/profile" className="navigation__profile">
        Аккаунт
      </Link>
    </div>
  );
}
