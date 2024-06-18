const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "60649a03-9004-49ba-b694-6881fa343a95",
    "Content-Type": "application/json",
  },
};

export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserApi = () => {
  return fetch(`${config.baseUrl}/users/me `, {
    method: "GET",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};

//Профиль
export const updateUserProfileApi = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then((res) => handleResponse(res));
};

export const updateUserAvatarApi = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => handleResponse(res));
};

//Карточки
export const getInitialCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};

export const createCardApi = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => handleResponse(res));
};

export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};

//Лайк
export const setLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};

export const setUnlikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};
