import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ place, link });
  }

  //очистка полей по открытии формы
  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add"}
      nameOfForm={"card-add"}
      idOfForm={"profile-add"}
      buttonText={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          type="text"
          value={place}
          className="form__input form__input_type_place"
          name="card-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          id="place-input"
          onChange={(e) => {
            setPlace(e.target.value);
          }}
        />
        <span className="place-input-error form__input-error"></span>
      </label>
      <label className="form__field">
        <input
          type="url"
          value={link}
          className="form__input form__input_type_link"
          name="card-link"
          placeholder="Ссылка на картинку"
          required
          id="link-input"
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <span className="link-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
