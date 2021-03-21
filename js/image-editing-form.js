import {isEscPressed, isClick, isActiveElement} from './utils.js';
import {resetScale} from './image-scale.js';
import {setOriginalState} from './image-filters.js';
import {} from './hashtag-validation.js';
import {sendData} from './server-connection.js';

const bodyElement = document.querySelector('body');
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadButtonElement = imageUploadFormElement.querySelector('#upload-file');
const editFormElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const buttonCloseEditFormElement = imageUploadFormElement.querySelector('#upload-cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');



const openEditForm = () => {
  editFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => onEditFormClosePressedEsc(evt));
  buttonCloseEditFormElement.addEventListener('click', (evt) => onEditFormClosePressedButtonClose(evt));
};

const closeEditForm = (evt) => {
  evt.preventDefault();
  editFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imageUploadFormElement.reset();
  document.removeEventListener('keydown', (evt) => onEditFormClosePressedEsc(evt));
  buttonCloseEditFormElement.removeEventListener('click', (evt) => onEditFormClosePressedButtonClose(evt));
  resetScale();
  setOriginalState();
};

const onEditFormClosePressedEsc = (evt) => {
  if(isEscPressed(evt) && !(isActiveElement(hashtagInputElement)) && !(isActiveElement(commentInputElement))) {
    closeEditForm(evt);
  }
};

const onEditFormClosePressedButtonClose = (evt) => {
  if(isClick(evt)) {
    closeEditForm(evt);
  }
};

imageUploadButtonElement.addEventListener('change', () => {
  let file = imageUploadButtonElement.files[0];
  if(file) {
    const reader = new FileReader();

    reader.addEventListener('load', openEditForm);

    reader.readAsDataURL(file);
  }
});

imageUploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(new FormData(evt.target));
});

const addRedBorder = (element) => {
  element.style.border= '3px solid red';
  element.style.outline= 'none';
  setTimeout(() => {
    element.style.border= '';
    element.style.outline= '';
  }, 5000);
};

const onInputCheck = () => {
  const inputFields = [hashtagInputElement, commentInputElement];
  inputFields.forEach((input) => {
    if(input.checkValidity() === false) {
      addRedBorder(input);
    }
  })
}

submitButtonElement.addEventListener('click', onInputCheck);

export {};
