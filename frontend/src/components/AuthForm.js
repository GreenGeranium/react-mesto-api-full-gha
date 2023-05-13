import { useState } from "react";

function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //вход в профиль
  function onSubmit(e) {
    e.preventDefault();
    props.onSubmit(email, password);
  }

  return (
    <main className="content">
      <section className="auth">
        <h2 className="auth__title">{props.title}</h2>
        <form
          className="form"
          method="get"
          name={props.formName}
          id={props.formName}
          onSubmit={onSubmit}
        >
          <label className="form__field">
            <input
              className="form__input form__input_theme_black"
              name="profile-email"
              type="email"
              placeholder="Email"
              required
              value={email}
              id="email-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label className="form__field">
            <input
              className="form__input form__input_theme_black"
              type="password"
              name="profile-password"
              placeholder="Пароль"
              required
              value={password}
              id="password-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button className="form__save-button form__save-buttton_theme_black">
            {props.buttonText}
          </button>
        </form>
        {props.children}
      </section>
    </main>
  );
}

export default AuthForm;
