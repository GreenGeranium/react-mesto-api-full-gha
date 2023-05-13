import logo from "../images/logo.svg";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function Header(props) {
  //обработчик клика по Выйти
  function onClick() {
    props.onSignout();
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта Место Россия" className="logo" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="account__link" to="/sign-up">
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link className="account__link" to="/sign-in">
              Войти
            </Link>
          }
        ></Route>
        <Route
          path="/"
          element={
            props.loggedIn && (
              <>
                <div
                  className="account__button"
                  onClick={props.handleBurgerClick}
                >
                  <div></div>
                </div>
                <div className="account">
                  <p className="account__email">{props.userEmail}</p>
                  <a className="account__email account__link" onClick={onClick}>
                    Выйти
                  </a>
                </div>
              </>
            )
          }
        ></Route>
      </Routes>
    </header>
  );
  //TODO: исправить в шапке название ссылки
}

export default Header;
