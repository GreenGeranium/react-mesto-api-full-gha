import { useEffect } from "react";
import Popup from "./Popup";

function ImagePopup(props) {
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
    <Popup
      onClose={props.onClose}
      isOpen={props.isOpen}
      name={props.name}
      containerType="popup__container_type_image"
    >
      <figure className="popup__figure">
        <img
          src={props.card.link}
          className="popup__image"
          alt={props.card.name}
        />
        <figcaption className="popup__subline">{props.card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
