import AuthForm from "../AuthForm/AuthForm.js";
import {
  LOGIN_FORM_SETTING,
  ERROR_MESSAGE,
  STORAGE_DATA_NAME,
} from "../../utils/constants.js";
import mainApi from "../../utils/api";

export default function Login({
  isLoad,
  setIsLoad,
  setCurrentUser,
  navigate,
  requestError,
  setRequestError,
}) {
  const handleAuthorizationUser = (userData) => {
    setIsLoad(true);

    mainApi
      .getAuthorizationUser(userData)
      .then((data) => {
        const { name, email, _id } = data;

        if (_id) {
          localStorage.setItem(STORAGE_DATA_NAME.userId, data._id);
          setCurrentUser((oldState) => ({ name, email, loggeIn: true }));
          navigate("/movies");
        }
      })
      .catch(() => setRequestError(ERROR_MESSAGE.errorRequest))
      .finally(() => setIsLoad(false));
  };

  return (
    <div className="login">
      <AuthForm
        isLoad={isLoad}
        setting={LOGIN_FORM_SETTING}
        handleSubmit={handleAuthorizationUser}
        requestError={requestError}
      />
    </div>
  );
}
