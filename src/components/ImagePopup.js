import React from "react";

import Popup from "./Popup";

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__image-container container">
        <img src={card.link} className="popup__image" alt={card.name} />
        <h2 className="popup__image-title">{card.name}</h2>
        <button type="button" className="popup__close-icon" onClick={onClose} />
      </div>
    </Popup>
  );
}
