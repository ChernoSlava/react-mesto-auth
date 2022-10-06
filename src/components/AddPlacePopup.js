import { useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

import { useForm } from "../hooks/useForm";

export default function AddPlacePopup({
  onAddPlace,
  isOpen,
  onClose,
  isLoading,
}) {
  const { values, handleChange, resetForm } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      btnClass="form-card-btn"
      buttonText={isLoading ? "Создание..." : "Создать"}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <input
          id="title"
          type="text"
          name="name"
          className="popup__field popup__field_type_title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={values.name || ""}
          onChange={handleChange}
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
          value={values.link || ""}
          onChange={handleChange}
        />
        <span className="popup__field-error popup__field-error_field_link">
          Необходимо заполнить данное поле
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
