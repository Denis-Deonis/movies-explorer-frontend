import AuthForm from "../AuthForm/AuthForm";
import { LOGIN_FORM_SETTING } from "../../utils/constants";

export default function Login({ handleSignIn, isLoading }) {

  return (
    <div className="login">
      <AuthForm
        setting={LOGIN_FORM_SETTING}
        title="Рады видеть!"
        buttonText="Войти"
        quiestion="Ещё не зарегистрированы?"
        link="Регистрация"
        toLink="/signup"
        registr={false}
        onSubmit={handleSignIn}
        isLoading={isLoading}
      />
    </div>
  );
}
