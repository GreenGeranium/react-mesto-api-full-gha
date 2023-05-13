import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import PageNotFound from "./PageNotFound";

function App() {
  //установление изначально закрытых папапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  //выбранная карточка
  const [selectedCard, setSelectedCard] = useState({});

  //массив карточек с сервера
  const [cards, setCards] = useState([]);

  //действующий пользователь
  const [currentUser, setCurrentUser] = useState({});

  //данные карточки, которую нужно удалить
  const [deletingCard, setDeletingCard] = useState({});

  //получение действующего профиля при рендере
  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //открытие попапа подтверждения удаления и передача данных карточки для удаления
  function handleConfirmation(card) {
    setIsConfirmationPopupOpen(true);
    setDeletingCard(card);
  }

  //обработчик удаления карточки
  function handleDeleteCard() {
    api
      .handleDeleteCard(deletingCard._id)
      .then(() => {
        renderCardsAfterDeleting();
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //рендер карточек после подтверждения удаления
  function renderCardsAfterDeleting() {
    setCards((cards) =>
      cards.filter((c) => {
        return c._id !== deletingCard._id;
      })
    );
  }

  //обработчик лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (cardLiker) => cardLiker._id === currentUser._id
    );

    api
      .handleCardLike(card._id, isLiked)
      .then((data) => {
        setCards((cards) =>
          cards.map((c) => {
            return c._id === card._id ? data : c;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //рендер всех карточек
  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //отправка на сервер новых данных пользователя из формы
  function handleUpdateUser(data) {
    api
      .changeUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //отправка на сервер новой аватарки из формы
  function handleUpdateAvatar(link) {
    api
      .changeProfileAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //отправка на сервер новой карточки из формы
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data.place, data.link)
      .then((newData) => {
        setCards([newData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обработчик клика по карточке
  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  }

  //открытие попапа с изменением аватарки
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //открытие попапа с изменением профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //открытие попапа с добавлением места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //закрытие всех попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);

    //сброс выбранной карточки
    setSelectedCard({});
  }

  //авторизован ли пользователь
  const [loggedIn, setLoggedIn] = useState(false);

  //данные пользователя
  const [userEmail, setUserEmail] = useState("");

  //успешная ли регистрация
  const [authSuccessful, setAuthSuccessful] = useState(false);

  //параметр успешной авторизации/регистрации

  const [authMessage, setAuthMessage] = useState("");

  const navigate = useNavigate();

  //регистрация пользователя
  function onRegister(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        navigate("/sign-in", { replace: true });
        setIsInfoTooltipPopupOpen(true);
        setAuthSuccessful(true);
        setAuthMessage("registration");
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setAuthSuccessful(false);
        console.log(err);
      });
  }

  //авторизация пользователя
  function onLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          navigate("/", { replace: true });
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          setUserEmail(email);
          setIsInfoTooltipPopupOpen(true);
          setAuthSuccessful(true);
          setAuthMessage("authentication");
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setAuthSuccessful(false);
        console.log(err);
      });
  }

  //при открытии страницы проверяется токен
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      auth
        .checkToken(jwt)
        .then((data) => {
          setUserEmail(data.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //выход из аккаунта
  function onSignout() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  //открытие и закрытие бургера
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {loggedIn && (
          <div
            className={`account__burger ${
              isBurgerOpen && "account__burger_open"
            }`}
          >
            <p className="account__email">{userEmail}</p>
            <a className="account__email account__link" onClick={onSignout}>
              Выйти
            </a>
          </div>
        )}
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onSignout={onSignout}
          handleBurgerClick={() => {
            setIsBurgerOpen(!isBurgerOpen);
          }}
        ></Header>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onTrashClick={handleConfirmation}
                element={Main}
              ></ProtectedRoute>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={<Login onLogin={onLogin}></Login>}
          ></Route>
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister}></Register>}
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer></Footer>
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          authSuccessful={authSuccessful}
          authMessage={authMessage}
        ></InfoTooltip>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        ></ImagePopup>
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
        ></ConfirmationPopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
