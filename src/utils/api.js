class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то упало: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  setUserAvatarToServer(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLike(id);
    } else {
      return this.doLike(id);
    }
  }

  deleteLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  doLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  postCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  setUserInfoToServer(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  getInitialCards() {
    return Promise.all([this.getUserInfoFromServer(), this.getCards()]);
  }

  getCards() {
    return this._request(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getUserInfoFromServer() {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    authorization: "1b4bc79c-4655-4b7c-ab14-ef593343b332",
    "Content-Type": "application/json",
  },
});

export default api;
