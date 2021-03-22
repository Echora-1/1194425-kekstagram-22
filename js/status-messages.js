import {isEscPressed, isClick} from './utils.js';

const mainElement = document.querySelector('main');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const successButton = successMessageElement.querySelector('.success__button');

const onSuccessMessageClosedPressedEsc = (evt) => {
  if(isEscPressed(evt)) {
    closeSuccessfulMessage(evt);
  }
}

const onSuccessMessageClosedMouseClick = (evt) => {
  if(isClick(evt)) {
    closeSuccessfulMessage(evt);
  }
}

const onSuccessMessageClosedPressedButton = (evt) => {
  if(isClick(evt)) {
    closeSuccessfulMessage(evt);
  }
}

const showSuccessfulMessage = () => {
  mainElement.append(successMessageElement);
  document.addEventListener('click', (evt) => onSuccessMessageClosedMouseClick(evt))
  document.addEventListener('keydown', (evt) => onSuccessMessageClosedPressedEsc(evt));
  successButton.addEventListener('click', (evt) => onSuccessMessageClosedPressedButton(evt))
};

const closeSuccessfulMessage = () => {
  successMessageElement.remove();
  document.removeEventListener('click', (evt) => onSuccessMessageClosedMouseClick(evt))
  document.removeEventListener('keydown', (evt) => onSuccessMessageClosedPressedEsc(evt));
  successButton.removeEventListener('click', (evt) => onSuccessMessageClosedPressedButton(evt))
};

export{showSuccessfulMessage};
