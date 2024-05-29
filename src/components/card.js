// Функция создания карточки
function createCard(cardData, deleteCard, likeCard, openCardImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement.addEventListener("click", deleteCard);
  cardElement.addEventListener("click", likeCard);
  cardImage.addEventListener("click", openCardImage);

  return cardElement;
}

// Функция удаления карточки
function deleteCard(evt) {
  if (evt.target.classList.contains("card__delete-button")) {
    evt.target.closest(".card").remove();
  }
}

//Функция лайка карточки
function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { createCard, deleteCard, likeCard };
