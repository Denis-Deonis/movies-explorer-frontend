import AuthForm from "../AuthForm/AuthForm";
import {
  LOGIN_FORM_SETTING,
} from "../../utils/constants";
import useForm from '../../hooks/useForm';

export default function Login(
  { onAuthorize, isLoading }
) {
  const { values} = useForm();

  const handleAuthorizationUser = () => {

    onAuthorize(values['login-email'], values['login-password']);
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
