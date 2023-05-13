import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(link);
  }

  //очистка полей по открытии формы
  React.useEffect(() => {
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      nameOfForm={"avatar-change"}
      idOfForm={"popup_avatar"}
      buttonText={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          type="url"
          value={link}
          className="form__input form__input_type_avatar"
          name="avatar-link"
          placeholder="Ссылка"
          required
          id="avatar-input"
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <span className="avatar-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
