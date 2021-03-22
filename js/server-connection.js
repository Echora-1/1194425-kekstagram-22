const SEND_URL = 'https://22.javascript.pages.academy/kekstagram';

const sendData = (onSuccess, body) => {
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
        console.log('error');
      }
    })
    .catch(() => {
      console.log('error');
    });
};

export {sendData};
