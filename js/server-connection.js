const SEND_URL = 'https://22.javascript.pages.academy/kekstagram';

const sendData = (body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
};

export {sendData};
