import { useEffect } from "react";
import Popup from "./Popup";

function PopupWithForm(props) {
  //закрытие по клавише Esc
  function handleEscEscape(event) {
    if (event.key === "Escape") {
      props.onClose();
    }
  }
  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener("keydown", handleEscEscape);
      return () => {
        document.removeEventListener("keydown", handleEscEscape);
      };
    }
  }, [props.isOpen]);

  return (
    <Popup onClose={props.onClose} isOpen={props.isOpen} name={props.name}>
      <h2 className="popup__title">{props.title}</h2>
      <form
        method="get"
        name={props.nameOfForm}
        className="form"
        noValidate
        id={props.idOfForm}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button className="form__save-button" type="submit">
          {props.buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
