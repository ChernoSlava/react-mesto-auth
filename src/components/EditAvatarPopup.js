import { useRef } from "react";

import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить Аватар"
      isOpen={isOpen}
      onClose={onClose}
      btnClass="avatar"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <input
          type="url"
          name="avatar"
          className="popup__field popup__field_type_avatar"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="popup__field-error popup__field-error_field_avatar">
          Необходимо заполнить данное поле
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
