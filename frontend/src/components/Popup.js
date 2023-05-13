import { useEffect } from "react";

const Popup = (props) => {
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
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div
        className={`popup__container ${props.containerType}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть попап"
          onClick={props.onClose}
        ></button>
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
