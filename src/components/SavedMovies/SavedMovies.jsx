import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { saveCardList } from '../../utils/saveCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies() {
  const { loggeIn } = useContext(CurrentUserContext);
  const [ saveCards, setSaveCards ] = useState([]);

  useEffect(() => {
    if (loggeIn) {
      setSaveCards(saveCardList);
    }
  }, [loggeIn])

  return (
    <div className="layout">
      <Header theme={{ default: false }} />
      <SearchForm />
      <MoviesCardList cardLists={saveCards} typeCardBtn={{ save: false }} />
      <Footer />
    </div>
  );
}
