import { deleteCardApi, setLikeApi, setUnlikeApi } from "../components/api.js";

// Функция создания карточки
function createCard(cardData, deleteCard, likeCard, openCardImage, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const cardId = cardData._id;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  if (cardData.owner["_id"] === userId) {
    deleteButton.classList.add("card__delete-button-visible");
    cardElement.addEventListener("click", (evt) => {
      deleteCard(evt, cardId);
    });
  }

  if (cardData.likes.length) {
    likeCount.classList.add("card__like-count-visible");
    likeCount.textContent = cardData.likes.length;
  }

  if (cardData.likes.some((element) => element["_id"] === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardElement.addEventListener("click", (evt) => {
    likeCard(evt, cardId, likeButton, likeCount);
  });
  cardImage.addEventListener("click", openCardImage);

  return cardElement;
}

// Функция удаления карточки
function deleteCard(evt, cardId) {
  if (evt.target.classList.contains("card__delete-button")) {
    deleteCardApi(cardId)
      .then((res) => {
        console.log(res);
        evt.target.closest(".card").remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Функция лайка карточки
function likeCard(evt, cardId, likeButton, likeCount) {
  const likeMethod = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? setUnlikeApi
    : setLikeApi;
  likeMethod(cardId)
    .then((res) => {
      evt.target.classList.toggle("card__like-button_is-active");
      likeCount.classList.toggle("card__like-count-visible", res.likes.length);
      likeCount.textContent = res.likes.length || "";
    })
    .catch((err) => console.log(err));
}

export { createCard, deleteCard, likeCard };
