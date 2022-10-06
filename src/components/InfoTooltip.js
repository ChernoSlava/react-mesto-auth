import React from "react";

import successIco from "../images/InfoPopupWork.svg";
import notSuccessIco from "../images/InfoPopupDon'tWork.svg";
import Popup from "./Popup";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={`popup__container container`}>
        <button
          type="button"
          className="popup__close-icon"
          onClick={onClose}
        ></button>
        <img
          className="popup__icon"
          src={isSuccess ? successIco : notSuccessIco}
          alt={
            isSuccess ? "Иконка - всё успешно" : "Иконка - что-то пошло не так"
          }
        />
        <h3 className="popup__description">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Пропробуйте ещё раз."}
        </h3>
      </div>
    </Popup>
    // <div className={`popup Info-popup ${isOpen && "popup_opened"}`}>

    // </div>
  );
}
