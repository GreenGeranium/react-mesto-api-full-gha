const BASE_URL = "http://localhost:4000";

//обработка запроса
function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  console.log(res);
  return Promise.reject(`Ошибка: ${res.status}`);
}

//регистрация пользователя
export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((response) => getResponseData(response));
}

//авторизация пользователя
export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((response) => getResponseData(response));
}

//проверка валидности токена
export function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((response) => getResponseData(response));
}
