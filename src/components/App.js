import { useState, useEffect, useCallback } from "react";
import { useHistory, Route, Switch } from "react-router-dom";

import ".././index.css";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from "../utils/api";
import auth from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const [cards, setCards] = useState([]);
  const history = useHistory();
  const [authorizatUserEmail, setAuthorizatUserEmail] = useState("");

  const [selectedCard, setSelectedCard] = useState({});
  const [cardForDelete, setCardForDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.getUserInfoFromServer(), api.getCards()])

      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handlerUpdateUser(data) {
    api
      .setUserInfoToServer(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatarToServer(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        );
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api
      .deleteCard(cardForDelete._id)
      .then(() => {
        const newCard = cards.filter((e) => e !== cardForDelete);
        setCards(newCard);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }

  function handleCardForDelete(card) {
    setCardForDelete(card);
    setConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  const handleCheckToken = useCallback(() => {
    const token = localStorage.getItem("jwt");
    auth
      .checkToken(token)
      .then((data) => {
        setAuthorizatUserEmail(data.data.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      handleCheckToken();
    }
  }, [handleCheckToken]);

  function handleRegistration(data) {
    auth
      .registration(data)
      .then(() => {
        setIsSignUpSuccess(true);
        handleInfoTooltipOpen();
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsSignUpSuccess(false);
        handleInfoTooltipOpen();
        console.log(err);
      });
  }

  function handleAuthorization(data) {
    auth
      .authorization(data)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          onSingOut={handleSignOut}
          authorizatUserEmail={authorizatUserEmail}
        />
        <Switch>
          <Route path="/sign-up">
            <Register onRegistration={handleRegistration} />
          </Route>
          <Route path="/sign-in">
            <Login
              onAuthorization={handleAuthorization}
              onCheckToken={handleCheckToken}
            />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onCardLike={handleCardLike}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardForDelete={handleCardForDelete}
          />
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handlerUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSignUpSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
