import { NavLink } from 'react-router-dom';

export default function Navigation({ isOpenBurger }) {
  return (
    <nav className={`navigation ${isOpenBurger ? "navigation_active" : ""}`}>
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink  to="/" className="navigation__link navigation__link_home">
            Главная
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink  to="/movies" className="navigation__link">
            Фильмы
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink  to="/saved-movies" className="navigation__link">
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink  to="/profile" className="navigation__profile">
        Аккаунт
      </NavLink>
    </nav>
  );
}
