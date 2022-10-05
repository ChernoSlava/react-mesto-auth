import React from "react";

import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({ isOpen, onClose, onSubmit }) {
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      container="popup__container-delete"
      btnClass="delete"
      buttonText="ДА"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    ></PopupWithForm>
  );
}
