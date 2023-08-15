// import findIcon from "./icon_find.svg";
// import { useEffect } from "react";


// export default function SearchForm({
//   isLoad,
//   savedMoviesType,
//   onSubmit,
//   savedSearch,
//   toggleShortMovie,
//   onToggleShortMovie,
// }) {



//   return (
//     <form className="search-form"  onSubmit={handleSubmit}>
//       <label className="search-form__wrapper search-form__wrapper_find">
//         <img className="search-form__img" src={findIcon} alt="" />
//         <input
//           className="search-form__input"
//           name="search-movies"
//           type="text"
//           placeholder="Фильм"
//           onChange={handleChange}
//           value={values["search-movies"] || ""}
//           required={!savedMoviesType ?? false}
//         />
//         <button
//           className="search-form__button"
//           disabled={isLoad ? true : false}
//         />
//       </label>
//       <label className="search-form__wrapper search-form__wrapper_short-film">
//         <span className="search-form__line"></span>
//         <input
//           id="short-film-toggle"
//           className="search-form__checkbox"
//           type="checkbox"
//           name="short-film-toggle"
//           checked={!!toggleShortMovie}
//           onChange={handleChecked}
//         />
//         <label
//           className="search-form__checkbox-label"
//           htmlFor="short-film-toggle"
//         />
//         <p className="search-form__short-film-text">Короткометражки</p>
//       </label>
//     </form>
//   );
// }
