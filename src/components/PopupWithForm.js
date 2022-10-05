import React from "react";

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
    <div className={`popup ${name}-popup ${isOpen && "popup_opened"}`}>
      <div className={`popup__container container ${container}`}>
        <p className="popup__title">{title}</p>
        <button
          type="button"
          className="popup__close-icon"
          onClick={onClose}
        ></button>
        <form
          className={`popup__form ${name}-form`}
          name={name}
          // noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`popup__submit-button popup__submit-${btnClass}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
