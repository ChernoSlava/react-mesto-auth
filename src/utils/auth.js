class Auth {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
  }

  _checkMainResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то упало: ${res.status}`);
  }

  registration(data) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkMainResponse);
  }

  authorization(data) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkMainResponse);
  }
  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkMainResponse);
  }
}

const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
