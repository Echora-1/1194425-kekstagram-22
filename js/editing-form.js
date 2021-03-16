import {isEscPressed, isClick} from './utils.js';

const imageUploadButtonElement = document.querySelector('#upload-file');
const ImageEditingFormElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const buttonCloseEditFormElement = document.querySelector('#upload-cancel');

const openImageEditingForm = () => {
  ImageEditingFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => onImageEditingFormClosePressedEsc(evt));
  buttonCloseEditFormElement.addEventListener('click', (evt) => onImageEditingFormClosePressedButtonClose(evt));
};

const closeImageEditingForm = () => {
  ImageEditingFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', (evt) => onImageEditingFormClosePressedEsc(evt));
  buttonCloseEditFormElement.removeEventListener('click', (evt) => onImageEditingFormClosePressedEsc(evt));
};

const onImageEditingFormClosePressedEsc = (evt) => {
  if(isEscPressed(evt)) {
    closeImageEditingForm();
  }
};

const onImageEditingFormClosePressedButtonClose = (evt) => {
  if(isClick(evt)) {
    closeImageEditingForm();
  }
};

imageUploadButtonElement.addEventListener('change', () => {
  let file = imageUploadButtonElement.files[0];
  if(file) {
    const reader = new FileReader();

    reader.addEventListener('load', openImageEditingForm);

    reader.readAsDataURL(file);
  }
});

export {};
