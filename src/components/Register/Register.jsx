import AuthForm from "../AuthForm/AuthForm";
import mainApi from "../../utils/mainApi";
import { ERROR_MESSAGE } from "../../utils/constants";

export default function Register({
  isLoad,
  setCurrentUser,
  setIsLoad,
  setIsLoggedIn,
  navigate,
  requestError,
  setRequestError,
}) {
  const handleRegistrationUser = (userData) => {
    setIsLoad(true);

    mainApi
      .getRegistrationUser(userData)
      .then(() => {
        return mainApi.getAuthorizationUser(userData);
      })
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
      .catch(() => setRequestError(ERROR_MESSAGE.repeatedEmail))
      .finally(() => setIsLoad(false));
  };
  return (
    <div className="register">
      <AuthForm
        isLoad={isLoad}
        handleSubmit={handleRegistrationUser}
        requestError={requestError}
        typeForm= "register"
        title={"Добро пожаловать!"}
        submitText="Зарегистрироваться"
        transitionText="Уже зарегистрированы?"
        transitionPath="/signin"
        transitionLinkText="Войти"

      />
    </div>
  );
}
