import { useState } from "react";
import { Routes } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./App.css";


import Main from "../Main/Main";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Denis-Deonis",
    email: "test@mail.ru",
    loggeIn: false,
  });

  return (
    <CurrentUserContext.Provider  value={currentUser}>
      <div className='page'>
        <Main/>
        <Routes></Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
