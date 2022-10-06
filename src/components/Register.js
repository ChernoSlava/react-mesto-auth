import React from "react";
import { Link } from "react-router-dom";

import { useForm } from "../hooks/useForm";

export default function Register({ onRegistration }) {
  const { values, handleChange } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(values);
  }

  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
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
          onChange={handleChange}
          className="auth__input second"
          name="password"
          placeholder="Пароль"
          autoComplete="off"
          type="password"
          required
          value={values.password || ""}
        ></input>
        <button className="button auth__button-submit" type="submit">
          Зарегистрироваться
        </button>
        <div className="auth__box">
          <h3 className="auth__add-quest">
            Уже зарегистрированы?&nbsp;
            <Link to="/sign-in" className="auth__link">
              Войти
            </Link>
          </h3>
        </div>
      </form>
    </section>
  );
}
