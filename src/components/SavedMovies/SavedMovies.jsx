import { useEffect, useState } from "react";
import { filterMovies, filterDuration } from '../../utils/config';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ savedMovies, onDislike }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies);
  };

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);
  return (
    <div className="layout">
      <Header theme={{ default: false }} />
      <SearchForm
        onSearch={onSearch}
        onCheckbox={handleShortMovies}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        isNotFound={isNotFound}
        isSavedMovies={true}
        cards={filteredMovies}
        savedMovies={savedMovies}
        onDislike={onDislike}
      />
      <Footer />
    </div>
  );
}
