import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //установка изначальных значений для формы
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //отрисовка значений формы, полученных из контекста с сервера
  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit"}
      nameOfForm={"profile-edit"}
      idOfForm={"profile-edit"}
      buttonText={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          type="text"
          value={name}
          className="form__input form__input_type_name"
          name="profile-name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          id="name-input"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <span className="name-input-error form__input-error"></span>
      </label>
      <label className="form__field">
        <input
          type="text"
          value={description}
          className="form__input form__input_type_profession"
          name="profile-description"
          placeholder="Описание"
          required
          minLength="2"
          maxLength="200"
          id="profession-input"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <span className="profession-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
