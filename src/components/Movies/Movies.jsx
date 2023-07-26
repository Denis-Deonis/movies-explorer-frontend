import { useContext, useEffect, useState } from "react";
import { cardList } from "../../utils/cardList";
import { CurrentUserContext } from "../../context/CurrentUserContext";
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
      <MoviesCardList cardList={cards} typeCardBtn={{ save: true }} />
      <Footer />
    </div>
  );
}
