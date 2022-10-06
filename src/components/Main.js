import { useContext } from "react";

import Card from "./Card";
import profileBtn from "../images/Profile__Edit-Button.svg";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardForDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt="Фото профиля"
            className="profile__avatar-element"
          />
          <button
            className="profile__avatar-btn"
            type="button"
            onClick={onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__button"
            onClick={onEditProfile}
          >
            <img src={profileBtn} alt="Кнопка редактирования" />
          </button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardForDelete={onCardForDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
