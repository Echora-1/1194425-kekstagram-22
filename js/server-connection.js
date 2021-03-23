import {showWarningMessage} from './warning-message.js'

const SEND_URL = 'https://22.javascript.pages.academy/kekstagram';
const GET_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const WARNING_MESSAGE = 'При загрузке данных с сервера произошла ошибка. Попробуйте позже';

const sendData = (onError, onSuccess, body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

const getData = (onError) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      onError();
    });
}

getData(() => showWarningMessage(WARNING_MESSAGE));
export {sendData, getData};
