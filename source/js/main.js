import 'nouislider/distribute/nouislider.css';

import {} from './image-editing-form.js';
import {showWarningMessage} from './warning-message.js'
import {getData} from './server-connection.js';
import {createImage} from './image-constructor.js';
import {showImageFilter} from './filtering-images.js';

const WARNING_MESSAGE = 'При загрузке данных с сервера произошла ошибка. Попробуйте позже';
const imageContainerElement = document.querySelector('.pictures');

getData(
  () => showWarningMessage(WARNING_MESSAGE),
  (data) =>
    data.forEach(item => {
      imageContainerElement.append(createImage(item));
    },
    showImageFilter(data),
    ),
);

