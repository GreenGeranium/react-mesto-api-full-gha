import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <AuthForm
      title="Вход"
      formName="authentication"
      buttonText="Войти"
      onSubmit={props.onLogin}
    ></AuthForm>
  );
}

export default Login;
