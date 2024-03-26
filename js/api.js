const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте еще раз',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте еще раз',
};

const load = (route, errorText, onFail, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch((error) => {
      onFail();
      throw new Error(errorText ?? error.message);
    });

const getData = (onFail) => load(Route.GET_DATA, ErrorText.GET_DATA, onFail);
const sendData = (onFail, body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, onFail, Method.POST, body,);

export { getData, sendData };
