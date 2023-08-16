import findIcon from "./icon_find.svg";

export default function SearchForm({
  moviesSearch,
  setMoviesSearch,
  isChecked,
  setIsChecked,
  handleSearchMovies,
}) {

  const handleChange = (e) => {
    setMoviesSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!moviesSearch) return;
    e.preventDefault();
    handleSearchMovies(isChecked);
  };

  const handleCheckbox = () => {
    handleSearchMovies(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-form__wrapper search-form__wrapper_find">
        <img className="search-form__img" src={findIcon} alt="" />
        <input
          className="search-form__input"
          name="search-movies"
          type="text"
          placeholder="Фильм"
          onChange={handleChange}
          value={moviesSearch}
        />
        <button className="search-form__button" type="submit" />
      </label>
      {/* {isQueryError && (
        <span className="search-form__error">Нужно ввести ключевое слово</span>
      )} */}
      <label className="search-form__wrapper search-form__wrapper_short-film">
        <span className="search-form__line"></span>
        <input
          id="short-film-toggle"
          className="search-form__checkbox"
          type="checkbox"
          name="short-film-toggle"
          checked={!isChecked}
          onChange={handleCheckbox}
        />
        <label
          className="search-form__checkbox-label"
          htmlFor="short-film-toggle"
        />
        <p className="search-form__short-film-text" onClick={handleCheckbox}>
          Короткометражки
        </p>
      </label>
    </form>
  );
}
