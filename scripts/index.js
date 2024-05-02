
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const page = document.querySelector('.page');
const cardsContainer = page.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = `На изображении ${cardData.name}`;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardDeleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach((cardData) => {
    cardsContainer.append(createCard(cardData, deleteCard));
});