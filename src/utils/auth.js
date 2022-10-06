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

  _request(url, options) {
    return fetch(url, options).then(this._checkMainResponse);
  }

  registration(data) {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    });
  }

  authorization(data) {
    return this._request(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    });
  }
  checkToken(token) {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
