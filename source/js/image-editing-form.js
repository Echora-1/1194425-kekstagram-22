import {isEscPressed, isClick, isActiveElement, addTemporaryRedBorder} from './utils.js';
import {resetScale} from './image-scale.js';
import {setOriginalState} from './image-filters.js';
import {} from './hashtag-validation.js';
import {sendData} from './server-connection.js';
import {showSuccessfulMessage, showErrorMessage, errorMessageElement} from './status-messages.js';

const SHOW_TIME = 5000;
const FILE_TYPES = ['image/svg+xml', 'image/jpeg', 'image/png'];
const bodyElement = document.querySelector('body');
const mainElement = document.querySelector('main');
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadButtonElement = imageUploadFormElement.querySelector('#upload-file');
const imagePreviewElement = imageUploadFormElement.querySelector('img');
const editFormElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const buttonCloseEditFormElement = imageUploadFormElement.querySelector('#upload-cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');

const openEditForm = () => {
  editFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  bodyElement.addEventListener('keydown', (evt) => onEditFormClosePressedEsc(evt));
  buttonCloseEditFormElement.addEventListener('click', (evt) => onEditFormClosePressedButtonClose(evt));
};

const closeEditForm = () => {
  editFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imageUploadFormElement.reset();
  bodyElement.removeEventListener('keydown', (evt) => onEditFormClosePressedEsc(evt));
  buttonCloseEditFormElement.removeEventListener('click', (evt) => onEditFormClosePressedButtonClose(evt));
  resetScale();
  setOriginalState();
};

const onEditFormClosePressedEsc = (evt) => {
  if(isEscPressed(evt) && !(isActiveElement(hashtagInputElement)) && !(isActiveElement(commentInputElement)) && !(mainElement.contains(errorMessageElement))) {
    evt.preventDefault();
    closeEditForm(evt);
  }
};

const onEditFormClosePressedButtonClose = (evt) => {
  if(isClick(evt)) {
    evt.preventDefault();
    closeEditForm(evt);
  }
};

imageUploadButtonElement.addEventListener('change', () => {
  let file = imageUploadButtonElement.files[0];
  if(FILE_TYPES.includes(file.type)) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imagePreviewElement.src = reader.result;
      openEditForm();
    });

    reader.readAsDataURL(file);
  }
});

const setSuccess = () => {
  closeEditForm();
  showSuccessfulMessage();
};

imageUploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(showErrorMessage, setSuccess, new FormData(evt.target));
});

const onInputCheck = () => {
  const inputFields = [hashtagInputElement, commentInputElement];
  inputFields.forEach((input) => {
    if(input.checkValidity() === false) {
      addTemporaryRedBorder(input, SHOW_TIME);
    }
  })
}

submitButtonElement.addEventListener('click', onInputCheck);

export {};
