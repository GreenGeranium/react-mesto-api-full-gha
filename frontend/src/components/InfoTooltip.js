import CorrectImage from "../images/Correct.svg";
import ErrorImage from "../images/Error.svg";
import Popup from "./Popup";

function InfoTooltip(props) {
  return (
    <Popup onClose={props.onClose} isOpen={props.isOpen} name={props.name}>
      <img
        src={props.authSuccessful ? CorrectImage : ErrorImage}
        className="infotooltip__image"
        alt="Значок ошибки"
      />
      <h2 className="infotooltip__text">
        {props.authSuccessful
          ? `Вы успешно ${
              props.authMessage === "registration"
                ? "зарегистрировались"
                : "вошли"
            } !`
          : "Что-то пошло не так!\n" + "Попробуйте ещё раз."}
      </h2>
    </Popup>
  );
}

export default InfoTooltip;
