import AuthForm from "../AuthForm/AuthForm";
import mainApi from "../../utils/mainApi";

export default function Login({
  isLoad,
  setIsLoad,
  setCurrentUser,
  setIsLoggedIn,
  navigate,
  requestError,
  setRequestError,
}) {
  const handleAuthorizationUser = (userData) => {
    setIsLoad(true);

    mainApi
      .getAuthorizationUser(userData)
      .then((data) => {
        const { name, email, _id, jwt } = data;

        if (_id) {
          localStorage.setItem('jwt', jwt);
          setIsLoggedIn(true);
          navigate("/movies");
          localStorage.setItem("uI", data._id);
          setCurrentUser((oldState) => ({ name, email, loggeIn: true }));

        }
      })
      .catch(() => setRequestError("Неверный email или пароль"))
      .finally(() => setIsLoad(false));
  };

  return (
    <div className="login">
      <AuthForm
        isLoad={isLoad}
        handleSubmit={handleAuthorizationUser}
        requestError={requestError}
        typeForm="login"
        title={"Рады видеть!"}
        submitText="Войти"
        transitionText="Ещё не зарегистрированы?"
        transitionPath="/signup"
        transitionLinkText="Регистрация"
      />
    </div>
  );
}
