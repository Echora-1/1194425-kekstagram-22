import {isEscPressed, isClick} from './utils.js';
import {resetScale} from './image-scale.js';
import {setOriginalState} from './image-filters.js';

const bodyElement = document.querySelector('body');
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadButtonElement = imageUploadFormElement.querySelector('#upload-file');
const editFormElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const buttonCloseEditFormElement = imageUploadFormElement.querySelector('#upload-cancel');

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
  if(isEscPressed(evt)) {
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


export {};
