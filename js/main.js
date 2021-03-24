import {} from './image-editing-form.js';
import {showWarningMessage} from './warning-message.js'
import {getData} from './server-connection.js';
import {createImage} from './image-constructor.js';

const WARNING_MESSAGE = 'При загрузке данных с сервера произошла ошибка. Попробуйте позже';
const imageContainer = document.querySelector('.pictures');

getData(
  () => showWarningMessage(WARNING_MESSAGE),
  (data) =>
    data.forEach(item => {
      imageContainer.append(createImage(item))
    },
    ),
);

