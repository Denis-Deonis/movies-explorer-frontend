import AuthForm from "../AuthForm/AuthForm";
import { REGISTER_FORM_SETTING } from "../../utils/constants";
// import useForm from '../../hooks/useForm';

export default function Register({ onRegister, isLoading }) {

  // const { values, errors, handleChange, isFormValid } = useForm();

  const handleRegistrationUser = (values) => {
    onRegister(values.name, values.email, values.password);
  };

  return (
    <div className="register">
      <AuthForm
        isLoad={isLoading}
        setting={REGISTER_FORM_SETTING}
        handleSubmit={handleRegistrationUser}
        // requestError={errors}
        // inputChange={handleChange}
        // isValid={isFormValid}
      />
    </div>
  );
}
