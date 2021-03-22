import {isEscPressed, isClick} from './utils.js';

const mainElement = document.querySelector('main');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = successMessageElement.querySelector('.success__button');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = errorMessageElement.querySelector('.error__button');

const onSuccessMessageClosedMouseClick = (evt) => {
  if(isClick(evt)) {
    closeSuccessfulMessage();
  }
}

const onSuccessMessageClosedPressedEsc = (evt) => {
  if(isEscPressed(evt)) {
    closeSuccessfulMessage();
  }
}

const onSuccessMessageClosedPressedButton = (evt) => {
  if(isClick(evt)) {
    closeSuccessfulMessage();
  }
}

const showSuccessfulMessage = () => {
  mainElement.append(successMessageElement);
  document.addEventListener('click', (evt) => onSuccessMessageClosedMouseClick(evt))
  document.addEventListener('keydown', (evt) => onSuccessMessageClosedPressedEsc(evt));
  successButtonElement.addEventListener('click', (evt) => onSuccessMessageClosedPressedButton(evt))
};

const closeSuccessfulMessage = () => {
  successMessageElement.remove();
  document.removeEventListener('click', (evt) => onSuccessMessageClosedMouseClick(evt))
  document.removeEventListener('keydown', (evt) => onSuccessMessageClosedPressedEsc(evt));
  successButtonElement.removeEventListener('click', (evt) => onSuccessMessageClosedPressedButton(evt))
};

const onErrorMessageClosedMouseClick = (evt) => {
  if(isClick(evt)) {
    closeErrorMessage();
  }
}

const onErrorMessageClosedPressedEsc = (evt) => {
  if(isEscPressed(evt)) {
    closeErrorMessage();
  }
}

const onErrorMessageClosedPressedButton = (evt) => {
  if(isClick(evt)) {
    closeErrorMessage();
  }
}

const showErrorMessage = () => {
  errorMessageElement.style.zIndex = 1000;
  mainElement.append(errorMessageElement);
  document.addEventListener('click', (evt) => onErrorMessageClosedMouseClick(evt));
  document.addEventListener('keydown', (evt) => onErrorMessageClosedPressedEsc(evt));
  errorButtonElement.addEventListener('click', (evt) => onErrorMessageClosedPressedButton(evt));
};

const closeErrorMessage = () => {
  errorMessageElement.remove();
  document.removeEventListener('click', (evt) => onErrorMessageClosedMouseClick(evt));
  document.removeEventListener('keydown', (evt) => onErrorMessageClosedPressedEsc(evt));
  errorButtonElement.removeEventListener('click', (evt) => onErrorMessageClosedPressedButton(evt));
};

export{showSuccessfulMessage, showErrorMessage, errorMessageElement};
