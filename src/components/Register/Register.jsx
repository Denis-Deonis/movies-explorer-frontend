import AuthForm from "../AuthForm/AuthForm";
import useForm from "../../hooks/useForm";
import { REGISTER_FORM_SETTING } from "../../utils/constants";

export default function Register({ onRegister, isLoading }) {
  const { values } = useForm();
  const handleRegistrationUser = () => {
    onRegister(values.name, values.email, values.password);
  };
  return (
    <div className="register">
      <AuthForm
        isLoad={isLoading}
        setting={REGISTER_FORM_SETTING}
        handleSubmit={handleRegistrationUser}
      />
    </div>
  );
}
