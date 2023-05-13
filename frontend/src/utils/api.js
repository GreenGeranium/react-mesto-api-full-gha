class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //обработка запроса
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //запрос на изменение аватарки
  changeProfileAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._getResponseData);
  }

  //запрос на изменение лайка
  handleCardLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //запрос на добавление карточки
  addNewCard(newName, newLink) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: newName,
        link: newLink,
      }),
    }).then(this._getResponseData);
  }

  //запрос на удаление карточки
  handleDeleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._getResponseData);
  }

  //запрос на получение информации о профиле
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //запрос на изменение профиля
  changeUserInfo(newName, newAbout) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then(this._getResponseData);
  }

  //загрузка карт с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      this._getResponseData
    );
  }
}

const api = new Api({
  baseUrl: "http://localhost:4000",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRmZDY4ODRlNWNlNGVlOWMxOGFiOGMiLCJpYXQiOjE2ODM5NjUxNjgsImV4cCI6MTY4NDU2OTk2OH0.WxpbfMpkT6993RKpMkBdaFheDS6sg7X2NOr2yEpCu-A",
    "Content-Type": "application/json",
  },
});

export default api;
