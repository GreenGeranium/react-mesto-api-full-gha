import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <AuthForm
      title="Регистрация"
      formName="registration"
      buttonText="Зарегистрироваться"
      onSubmit={props.onRegister}
    >
      <p className="auth__question">
        Уже зарегистрированы?{" "}
        <Link className="auth__question" to="/sign-in">
          Войти
        </Link>
      </p>
      ;
    </AuthForm>
  );
}

export default Register;
