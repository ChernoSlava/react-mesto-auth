import React from "react";
import { useState } from "react";

export default function Login({ onAuthorization }) {
  const [values, setValues] = useState({});

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

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
        ></input>
        <input
          className="auth__input second"
          name="password"
          placeholder="Пароль"
          autoComplete="off"
          type="password"
          onChange={handleChange}
          required
        ></input>
        <button className="button auth__button-submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
