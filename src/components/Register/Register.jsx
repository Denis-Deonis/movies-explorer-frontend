import AuthForm from "../AuthForm/AuthForm";
import { REGISTER_FORM_SETTING } from "../../utils/constants";

export default function Register({ handleSignUp, isLoading }) {


  return (
    <div className="register">
      <AuthForm
        setting={REGISTER_FORM_SETTING}
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        quiestion="Уже зарегистрированы?"
        link="Войти"
        toLink="/signin"
        registr={true}
        onSubmit={handleSignUp}
        isLoading={isLoading}
      />
    </div>
  );
}
