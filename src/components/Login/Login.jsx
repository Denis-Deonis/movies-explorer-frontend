import AuthForm from "../AuthForm/AuthForm";
import { LOGIN_FORM_SETTING } from "../../utils/constants";

export default function Login({
  isLoad,
  setIsLoad,
  requestError,
  onAuthorize,
}) {
  const handleAuthorizationUser = (userData) => {
    setIsLoad(true);

    const email = userData.email;
    const password = userData.password;
    const name = userData.name;

    onAuthorize({ email, password, name });
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
