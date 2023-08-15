import findIcon from "./icon_find.svg";
import { useState, useEffect } from "react";

export default function SearchForm({ onSearch, onCheckbox, isShortMovies }) {
  const [isQueryError, setIsQueryError] = useState(false);
  const [query, setQuery] = useState("");
  const path = window.location.pathname;

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      onSearch(query);
    }
  };

  useEffect(() => {
    if (path === "/movies" && localStorage.getItem("query")) {
      const localQuery = localStorage.getItem("query");
      setQuery(localQuery);
    }
  }, [path]);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-form__wrapper search-form__wrapper_find">
        <img className="search-form__img" src={findIcon} alt="" />
        <input
          className="search-form__input"
          name="search-movies"
          type="text"
          placeholder="Фильм"
          value={query || ""}
          onChange={handleChange}
        />
        <button className="search-form__button" type="submit" />
      </label>
      {isQueryError && (
        <span className="search-form__error">Нужно ввести ключевое слово</span>
      )}
      <label className="search-form__wrapper search-form__wrapper_short-film">
        <span className="search-form__line"></span>
        <input
          id="short-film-toggle"
          className="search-form__checkbox"
          type="checkbox"
          name="short-film-toggle"
          checked={isShortMovies}
          onChange={onCheckbox}
        />
        <label
          className="search-form__checkbox-label"
          htmlFor="short-film-toggle"
        />
        <p className="search-form__short-film-text" onClick={onCheckbox}>
          Короткометражки
        </p>
      </label>
    </form>
  );
}
