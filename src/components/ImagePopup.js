import React from "react";

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup image-popup ${card && isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__image-container container">
        <img src={card.link} className="popup__image" alt={card.name} />
        <h2 className="popup__image-title">{card.name}</h2>
        <button
          type="button"
          className="popup__close-icon"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
