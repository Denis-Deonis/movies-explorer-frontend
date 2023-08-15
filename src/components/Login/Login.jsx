import AuthForm from "../AuthForm/AuthForm";
import { LOGIN_FORM_SETTING } from "../../utils/constants";

export default function Login({ onAuthorize, isLoading }) {

  const handleAuthorizationUser = (values) => {
    onAuthorize(values.email, values.password);
  };

  return (
    <div className="login">
      <AuthForm
        isLoad={isLoading}
        setting={LOGIN_FORM_SETTING}
        handleSubmit={handleAuthorizationUser}
      />
    </div>
  );
}
