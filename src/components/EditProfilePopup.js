import { useState, useContext, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      btnClass="profile-btn"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <input
          id="name"
          type="text"
          name="name"
          className="popup__field popup__field_type_name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__field-error popup__field-error_field_name">
          Необходимо заполнить данное поле
        </span>
        <input
          id="job"
          type="text"
          name="job"
          className="popup__field popup__field_type_job"
          placeholder="Ваша работа"
          minLength="2"
          maxLength="200"
          required
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__field-error popup__field-error_field_job">
          Необходимо заполнить данное поле
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
