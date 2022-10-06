import React from "react";

import Popup from "./Popup";

export default function PopupWithForm({
  name,
  isOpen,
  container,
  title,
  onClose,
  btnClass,
  buttonText,
  children,
  onSubmit,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <div className={`popup__container container ${container}`}>
        <p className="popup__title">{title}</p>
        <form
          className={`popup__form ${name}-form`}
          name={name}
          onSubmit={onSubmit}
        >
          <button
            type="button"
            className="popup__close-icon"
            onClick={onClose}
          />
          {children}
          <button
            type="submit"
            className={`popup__submit-button popup__submit-${btnClass}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </Popup>
  );
}
