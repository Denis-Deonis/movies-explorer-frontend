// import { useEffect, useState } from "react";

// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import SearchForm from "../SearchForm/SearchForm";

// export default function SavedMovies({
//   isLoad,
//   setIsLoad,
//   saveMovies,
//   handleDeleteSaveMovie,
//   toggleShortSavedMovie,
//   onToggleShortSavedMovie,
//   error,
//   setError,
// }) {

//   return (
//     <div className="layout">
//       <Header theme={{ default: false }} />
//       <SearchForm
//         isLoad={isLoad}
//         savedMoviesType={true}
//         onSubmit={setSearchQuery}
//         toggleShortMovie={toggleShortSavedMovie}
//         onToggleShortMovie={onToggleShortSavedMovie}
//       />
//       <MoviesCardList
//         isLoad={isLoad}
//         moviesList={filterList}
//         error={error}
//         savedMovieBtn={true}
//         handleActionBtn={handleDeleteSaveMovie}
//       />
//       <Footer />
//     </div>
//   );
// }
