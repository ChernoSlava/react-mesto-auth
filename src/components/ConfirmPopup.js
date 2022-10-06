import React from "react";

import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({ isOpen, onClose, onSubmit, isLoading }) {
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      container="popup__container-delete"
      btnClass="delete"
      buttonText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
