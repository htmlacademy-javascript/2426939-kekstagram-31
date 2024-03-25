const sendData = (resolve, reject, onSuccess, body, evt) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
    })
    .then(() => {
      resolve(evt, onSuccess);
    })
    .catch(() => {
      reject();
      throw new Error('Не удалось отправить форму. Попробуйте еще раз');
    });
};

const getData = (onSuccess, onFail) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      onFail();
      throw new Error('Не удалось загрузить данные. Попробуйте еще раз');
    });
};

export { getData, sendData };
