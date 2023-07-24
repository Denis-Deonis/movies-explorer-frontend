import AuthForm from "../AuthForm/AuthForm.js";
import { registerFormSetting } from "../../utils/constants.js";

export default function Register() {
  return (
    <div className="register">
      <AuthForm setting={registerFormSetting} />
    </div>
  );
}
