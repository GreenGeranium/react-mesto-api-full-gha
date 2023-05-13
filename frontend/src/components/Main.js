import Card from "./Card.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const userData = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            src={userData.avatar}
            alt="Аватарка Жак-Ив Кусто"
            className="profile__avatar"
          />
        </div>
        <div className="profile__description">
          <h1 className="profile__name">{userData.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subline">{userData.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить фотографию"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="Фотокарточки городов">
        <ul className="elements__list">
          {props.cards.map((card) => {
            return (
              <li className="elements__item" key={card._id}>
                <Card
                  card={card}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onTrashClick={props.onTrashClick}
                ></Card>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
