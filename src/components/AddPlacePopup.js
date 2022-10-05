import { useState } from "react";

import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function resetForm() {
    setName("");
    setLink("");
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
    resetForm();
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      btnClass="form-card-btn"
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <input
          id="title"
          type="text"
          name="title"
          className="popup__field popup__field_type_title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__field-error popup__field-error_field_title">
          Необходимо заполнить данное поле
        </span>
        <input
          id="url"
          type="url"
          name="link"
          className="popup__field popup__field_type_link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__field-error popup__field-error_field_link">
          Необходимо заполнить данное поле
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
