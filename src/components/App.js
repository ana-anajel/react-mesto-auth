import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import api from '../utils/Api';
import '../index.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Register from './Register';
import Login from './Login';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    Promise.all([api.getDataUser(), api.getInitialCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setIsImagePopupOpen(true);
    setSelectedCard(data);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке 
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => console.log(err));
    }
    else {
      api.deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.editDataUser(data.name, data.about)
      .then(data => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api.editAvatarUser(data.avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAddCard(data) {
    api.addNewCard(data.name, data.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (

    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onLogged={loggedIn}
        />
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}

            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Route>

          <Route path="/sign-up">
            <Register />

          </Route>

          <Route path="/sign-in">
            <Login />
          </Route>

        </Switch>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleUpdateAddCard}
        />

        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          buttonSave='Да'
          onClose={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;

/*
         <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}

            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Route>

          */
/*
<ProtectedRoute
  path="/"
  loggedIn={loggedIn}
  component={Main}

  onEditAvatar={handleEditAvatarClick}
  onEditProfile={handleEditProfileClick}
  onAddPlace={handleAddPlaceClick}
  onCardClick={handleCardClick}
  cards={cards}
  onCardLike={handleCardLike}
  onCardDelete={handleCardDelete}
/>
*/