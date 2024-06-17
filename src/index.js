import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { initialCards } from "./components/cards.js";
import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "./components/validation.js";
import {
  getResponse,
  getUserApi,
  updateUserProfileApi,
  updateUserAvatarApi,
  getInitialCardsApi,
  createCardApi,
  deleteCardApi,
  setLikeApi,
  setUnlikeApi,
} from "./components/api.js";

// Существующие карточки
const page = document.querySelector(".page");
const cardsContainer = page.querySelector(".places__list");
const cardImagePopup = document.querySelector(".popup_type_image");
const cardImagePopupImage = cardImagePopup.querySelector(".popup__image");
const cardImagePopupCaption = cardImagePopup.querySelector(".popup__caption");

//Форма создания новой карточки
const newCardPopup = page.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];
const newCardName = newCardForm.elements["place-name"];
const newCardLink = newCardForm.elements.link;
const newCardSaveButton = newCardForm.querySelector(".popup__button");

//Изменение профиля
const editProfilePopup = page.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = document.forms["edit-profile"];
const newProfileName = editProfileForm.elements.name;
const newProfileDescription = editProfileForm.elements.description;
const updateProfileSaveButton = editProfileForm.querySelector(".popup__button");

//Изменение аватарки
const editAvatarPopup = document.querySelector(".popup_type_edit_avatar");
const editAvatarForm = document.forms["edit-avatar"];
const avatarLinkInput = editAvatarForm.querySelector(".popup__input_type_url");
const avatarImage = document.querySelector(".profile__image");
const editAvatarSaveButton = editAvatarForm.querySelector(".popup__button");

//BH
function setUserProfile(userData) {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  avatarImage.style.backgroundImage = `url(${userData.avatar})`;
}

//DOM
function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

function openCardImage(evt) {
  cardImagePopupImage.src = evt.target.currentSrc;
  cardImagePopupImage.alt = evt.target.alt;
  cardImagePopupCaption.textContent = evt.target.alt;
  openModal(cardImagePopup);
}

function openEditProfile(evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    newProfileName.value = profileName.textContent;
    newProfileDescription.value = profileDescription.textContent;
    openModal(editProfilePopup);
    clearValidation(editProfileForm, validationConfig);
  }
}

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  renderLoading(true, updateProfileSaveButton);

  updateUserProfileApi(newProfileName.value, newProfileDescription.value)
    .then((res) => {
      setUserProfile(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, updateProfileSaveButton);
      closeModal(editProfilePopup);
    });
}

function openCreateCardForm(evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    openModal(newCardPopup);
    clearValidation(newCardForm, validationConfig);
  }
}

function createNewCardSubmitHandler(evt) {
  evt.preventDefault();
  renderLoading(true, newCardSaveButton);

  const newCard = {
    name: newCardName.value,
    link: newCardLink.value,
  };

  createCardApi(newCard.name, newCard.link)
    .then((res) => {
      cardsContainer.prepend(
        createCard(newCard, deleteCard, likeCard, openCardImage, userId)
      );
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, newCardSaveButton);
      closeModal(newCardPopup);
      newCardForm.reset();
    });
}

function openEditAvatarForm(evt) {
  if (evt.target.classList.contains("profile__image")) {
    openModal(editAvatarPopup);
    clearValidation(editAvatarPopup, validationConfig);
  }
}

function editEditAvatarSubmitHandler(evt) {
  evt.preventDefault();
  renderLoading(true, editAvatarSaveButton);

  updateUserAvatarApi(avatarLinkInput.value)
    .then((res) => {
      setUserProfile(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, editAvatarSaveButton);
      closeModal(editAvatarPopup);
      editAvatarForm.reset();
    });
}

page.addEventListener("click", openEditProfile);
page.addEventListener("click", openCreateCardForm);
page.addEventListener("click", openEditAvatarForm);
editProfileForm.addEventListener("submit", editProfileFormSubmitHandler);
newCardPopup.addEventListener("submit", createNewCardSubmitHandler);
editAvatarForm.addEventListener("submit", editEditAvatarSubmitHandler);

enableValidation(validationConfig);

let userId;

getUserApi()
  .then((res) => {
    setUserProfile(res);
    userId = res._id;
  })
  .catch((err) => {
    console.error(err);
  });

getInitialCardsApi()
  .then((initialCards) => {
    //Вывести карточки на страницу
    initialCards.forEach((cardData) => {
      cardsContainer.append(
        createCard(
          cardData,
          deleteCard,
          likeCard,
          openCardImage,
          userId
        )
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });
