import {isEscPressed, isClick} from './utils.js';

const SHOW_TIME = 5000;
const mainElement = document.querySelector('main');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = successMessageElement.querySelector('.success__button');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = errorMessageElement.querySelector('.error__button');

const showWarningMessage = (message) => {
  const messageContainer = document.createElement('div');

  messageContainer.style.zIndex = 1000;
  messageContainer.style.position = 'fixed';
  messageContainer.style.left = 0;
  messageContainer.style.top = '18px';
  messageContainer.style.right = 0;
  messageContainer.style.padding = '10px 3px';
  messageContainer.style.fontSize = '20px'
  messageContainer.style.lineHeight =  '28px';
  messageContainer.style.fontFamily = 'Open Sans,Arial,sans-serif'
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = '#FE4D4D';
  messageContainer.textContent = message;
  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, SHOW_TIME);
}

const handleSuccessMessageMouseClick = (evt) => {
  if(isClick(evt)) {
    closeSuccessfulMessage();
  }
}

const handleSuccessMessagePressedEsc = (evt) => {
  if(isEscPressed(evt)) {
    closeSuccessfulMessage();
  }
}

const handleSuccessMessagePressedButton = (evt) => {
  if(isClick(evt)) {
    closeSuccessfulMessage();
  }
}

const showSuccessfulMessage = () => {
  mainElement.append(successMessageElement);
  document.addEventListener('click', (evt) => handleSuccessMessageMouseClick(evt))
  document.addEventListener('keydown', (evt) => handleSuccessMessagePressedEsc(evt));
  successButtonElement.addEventListener('click', (evt) => handleSuccessMessagePressedButton(evt))
};

const closeSuccessfulMessage = () => {
  successMessageElement.remove();
  document.removeEventListener('click', (evt) => handleSuccessMessageMouseClick(evt))
  document.removeEventListener('keydown', (evt) => handleSuccessMessagePressedEsc(evt));
  successButtonElement.removeEventListener('click', (evt) => handleSuccessMessagePressedButton(evt))
};

const handleErrorMessageMouseClick = (evt) => {
  if(isClick(evt)) {
    closeErrorMessage();
  }
}

const handleErrorMessagePressedEsc = (evt) => {
  if(isEscPressed(evt)) {
    closeErrorMessage();
  }
}

const handleErrorMessagePressedButton = (evt) => {
  if(isClick(evt)) {
    closeErrorMessage();
  }
}

const showErrorMessage = () => {
  errorMessageElement.style.zIndex = 1000;
  mainElement.append(errorMessageElement);
  document.addEventListener('click', (evt) => handleErrorMessageMouseClick(evt));
  document.addEventListener('keydown', (evt) => handleErrorMessagePressedEsc(evt));
  errorButtonElement.addEventListener('click', (evt) => handleErrorMessagePressedButton(evt));
};

const closeErrorMessage = () => {
  errorMessageElement.remove();
  document.removeEventListener('click', (evt) => handleErrorMessageMouseClick(evt));
  document.removeEventListener('keydown', (evt) => handleErrorMessagePressedEsc(evt));
  errorButtonElement.removeEventListener('click', (evt) => handleErrorMessagePressedButton(evt));
};

export{showSuccessfulMessage, showErrorMessage, errorMessageElement, showWarningMessage};
