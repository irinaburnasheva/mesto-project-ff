const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "60649a03-9004-49ba-b694-6881fa343a95",
    "Content-Type": "application/json",
  },
};

export const getUserApi = () => {
  return fetch(`${config.baseUrl}/users/me `, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      // если успех, возвращаем ответ в формате json
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
  }).then((res) => {
    if (res.ok) {
      // если успех, возвращаем ответ в формате json
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const updateUserAvatarApi = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      // если успех, возвращаем ответ в формате json
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//Карточки
export const getInitialCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      // если успех, возвращаем ответ в формате json
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const createCardApi = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    if (res.ok) {
      // если успех, возвращаем ответ в формате json
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      // если успех, возвращаем ответ в формате json
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//Лайк
export const setLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      // если успех, возвращаем ответ в формате json
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const setUnlikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      // если успех, возвращаем ответ в формате json
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
