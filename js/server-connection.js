const SEND_URL = 'https://22.javascript.pages.academy/kekstagram';
const GET_URL = 'https://22.javascript.pages.academy/kekstagram/data';

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

const getData = (onError,  onSuccess) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
}


export {sendData, getData};
