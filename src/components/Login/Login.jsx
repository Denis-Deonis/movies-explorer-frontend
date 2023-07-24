import AuthForm from '../AuthForm/AuthForm.js';
import { loginFormSetting } from '../../utils/constants.js';

export default function Login() {
  return (
    <div className="login">
      <AuthForm setting={loginFormSetting}/>
    </div>
  )
}
