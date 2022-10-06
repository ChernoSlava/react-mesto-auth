import React from "react";

import { useForm } from "../hooks/useForm";

export default function Login({ onAuthorization }) {
  const { values, handleChange } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorization(values);
  }

  return (
    <section className="auth">
      <h1 className="auth__title">Вход</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="auth__input"
          name="email"
          placeholder="Email"
          autoComplete="off"
          type="email"
          required
          value={values.email || ""}
        ></input>
        <input
          className="auth__input second"
          name="password"
          placeholder="Пароль"
          autoComplete="off"
          type="password"
          onChange={handleChange}
          required
          value={values.password || ""}
        ></input>
        <button className="button auth__button-submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
