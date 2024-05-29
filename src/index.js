import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { initialCards } from "./components/cards.js";

// DOM узлы
const page = document.querySelector(".page");
const cardsContainer = page.querySelector(".places__list");
const cardImagePopup = document.querySelector(".popup_type_image");
const cardImagePopupImage = cardImagePopup.querySelector(".popup__image");
const cardImagePopupCaption = cardImagePopup.querySelector(".popup__caption");

const newCardPopup = page.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];
const newCardName = newCardForm.elements["place-name"];
const newCardLink = newCardForm.elements.link;

const editProfilePopup = page.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = document.forms["edit-profile"];
const newProfileName = editProfileForm.elements.name;
const newProfileDescription = editProfileForm.elements.description;

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
  }
}

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = newProfileName.value;
  profileDescription.textContent = newProfileDescription.value;
  closeModal(editProfilePopup);
}

function openCreateCardForm(evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    openModal(newCardPopup);
  }
}

function createNewCardSubmitHandler(evt) {
  evt.preventDefault();

  const newCard = {
    name: newCardName.value,
    link: newCardLink.value
  };

  cardsContainer.prepend(
    createCard(newCard, deleteCard, likeCard, openCardImage)
  );

  newCardForm.reset();
  closeModal(newCardPopup);
}

page.addEventListener("click", openEditProfile);
page.addEventListener("click", openCreateCardForm);
editProfileForm.addEventListener("submit", editProfileFormSubmitHandler);
newCardPopup.addEventListener("submit", createNewCardSubmitHandler);

//Вывести карточки на страницу
initialCards.forEach((cardData) => {
  cardsContainer.append(
    createCard(cardData, deleteCard, likeCard, openCardImage)
  );
});
