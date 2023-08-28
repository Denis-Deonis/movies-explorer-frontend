import AuthForm from "../AuthForm/AuthForm";
import { ERROR_MESSAGE } from "../../utils/constants";
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
          localStorage.setItem("userID", data._id);
          setCurrentUser((oldState) => ({ name, email, loggeIn: true }));

        }
      })
      .catch(() => setRequestError(ERROR_MESSAGE.errorRequest))
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
