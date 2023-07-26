import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./App.css";

import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Denis-Deonis",
    email: "test@mail.ru",
    loggeIn: false,
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
