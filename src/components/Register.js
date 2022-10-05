import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegistration }) {
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
        ></input>
        <input
          onChange={handleChange}
          className="auth__input second"
          name="password"
          placeholder="Пароль"
          autoComplete="off"
          type="password"
          required
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
