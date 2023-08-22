import AuthForm from "../AuthForm/AuthForm";
import {
  // ERROR_MESSAGE,
  LOGIN_FORM_SETTING,
  // STORAGE_DATA_NAME,
} from "../../utils/constants";
// import mainApi from "../../utils/mainApi";

export default function Login({
  isLoad,
  setIsLoad,
  setCurrentUser,
  navigate,
  requestError,
  setRequestError,
  onAuthorize,
}) {


  const handleAuthorizationUser = (userData) => {
    setIsLoad(true);
    
    const email = userData.email;
    const password = userData.password;
    const name = userData.name;

    onAuthorize({email, password, name});


    // mainApi.getAuthorizationUser(userData)
    //   .then(data => {
    //     const { name, email, _id } = data;

    //     if (_id) {
    //       localStorage.setItem(STORAGE_DATA_NAME.userId, data._id);
    //       setCurrentUser(oldState => ({ name, email, loggeIn: true }));
    //       navigate('/movies');
    //     };
    //   })
    //   .catch(() => setRequestError(ERROR_MESSAGE.errorRequest))
    //   .finally(() => setIsLoad(false));
  }

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
