import findIcon from "./icon_find.svg";
import { useState, useEffect } from 'react';
import useFormValidation from '../../hooks/useFormValidator';

export default function SearchForm({
  isLoad,
  savedMoviesType,
  onSubmit,
  savedSearch,
  toggleShortMovie,
  onToggleShortMovie,
}) {

  const { values, setValues, errors, isValid, handleChange } = useFormValidation();
  const handleChecked = () => onToggleShortMovie(!toggleShortMovie);
  const [isQueryError, setIsQueryError] = useState(false);

  useEffect(() => {
    const name = "search";
    setValues({ [name]: savedSearch });
  }, [setValues, savedSearch]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!isValid) {
      setIsQueryError(true);
    } else if ( values["search"].length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      onSubmit(values["search"]);
    }
  };

  return (
    <form id="search-form" className="search-form"  onSubmit={handleSubmit}>
      <label className="search-form__wrapper search-form__wrapper_find">
      { isQueryError && (<span className="search-form__span-error">
        {"Нужно ввести ключевое слово"}
      </span>)
      }

        <img className="search-form__img" src={findIcon} alt="" />
        <input
          className={`search-form__input ${errors.search ? "search-form__input_error" : ""}`}
          id="search"
          name="search"
          type="text"
          placeholder={errors.search ? "": "Фильм"}
          onChange={handleChange}
          value={values.search || ""}
        />
        <button
          className="search-form__button"
          type="submit"
          form="search-form"
          disabled={isLoad ? true : false}
        />
      </label>
      <label className="search-form__wrapper search-form__wrapper_short-film">
        <span className="search-form__line"></span>
        <input
          id="short-film-toggle"
          className="search-form__checkbox"
          type="checkbox"
          name="short-film-toggle"
          checked={!!toggleShortMovie}
          onChange={handleChecked}
        />
        <label
          className="search-form__checkbox-label"
          htmlFor="short-film-toggle"
        />
        <p className="search-form__short-film-text">Короткометражки</p>
      </label>
    </form>
  );
}
