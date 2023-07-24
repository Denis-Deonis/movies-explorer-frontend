import findIcon from "./icon_find.svg"

export default function SearchForm() {
  return (
    <form className="search-form">
      <label className="search-form__wrapper search-form__wrapper_find">
        <img  className="search-form__img" src={findIcon} alt="" />
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          required
        />
        <button className="search-form__button"/>
      </label>
      <label className="search-form__wrapper search-form__wrapper_short-film">
        <span className="search-form__"></span>
        <input
          id="short-film-toggle"
          className="search-form__checkbox"
          type="checkbox"
          name="short-film-toggle"
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
