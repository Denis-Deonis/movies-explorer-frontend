import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { cardList } from "../../utils/cardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies() {
  const { loggeIn } = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (loggeIn) {
      setCards(cardList);
    }
  }, [loggeIn]);

  return (
    <div>
      <Header theme={{ default: false }} />
      <SearchForm />
      <MoviesCardList cardLists={cards} typeCardBtn={{ save: true }} />
      <Footer />
    </div>
  );
}
