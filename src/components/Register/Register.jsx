import AuthForm from "../AuthForm/AuthForm";
import { REGISTER_FORM_SETTING } from "../../utils/constants";

export default function Register({
  isLoad,
  setIsLoad,
  requestError,
  onRegister,
}) {
  const handleRegistrationUser = (userData) => {
    setIsLoad(true);

    const email = userData.email;
    const password = userData.password;
    const name = userData.name;

    onRegister({ email, password, name });
  };

  return (
    <div className="register">
      <AuthForm
        isLoad={isLoad}
        setting={REGISTER_FORM_SETTING}
        handleSubmit={handleRegistrationUser}
        requestError={requestError}
      />
    </div>
  );
}
