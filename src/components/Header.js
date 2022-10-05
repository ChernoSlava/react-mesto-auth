import React from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import logo from "../images/logo.svg";

export default function Header({ loggedIn, onSingOut, authorizatUserEmail }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleToggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  function handleSignOut() {
    setMenuIsOpen(false);
    onSingOut();
  }

  let location = useLocation();

  return (
    <header className={loggedIn ? "header header_burger" : "header"}>
      {loggedIn && (
        <div
          className={
            menuIsOpen
              ? "header__container header__container_opened"
              : "header__container"
          }
        >
          <address className="header__address">
            {authorizatUserEmail && authorizatUserEmail}
          </address>
          <button
            className="header__exitBtn"
            type="button"
            onClick={handleSignOut}
          >
            Выйти
          </button>
        </div>
      )}
      <div className="header__main-container">
        <img
          className="header__logo"
          alt="Логотип социальной сети Место, с подписью
      Россия"
          src={logo}
        />
        {loggedIn && (
          <button
            className={
              menuIsOpen
                ? "header__burger-btn header__burger-btn_opened"
                : "header__burger-btn"
            }
            type="button"
            aria-label="кнопка меню"
            onClick={handleToggleMenu}
          />
        )}
        {!loggedIn && (
          <nav>
            {location.pathname === "/sign-in" && (
              <NavLink className="header__navlink" to="/sign-up">
                Регистрация
              </NavLink>
            )}
            {location.pathname === "/sign-up" && (
              <NavLink className="header__navlink" to="/sign-in">
                Войти
              </NavLink>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
