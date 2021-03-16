import {isEscPressed, isClick} from './utils.js';

const bodyElement = document.querySelector('body');
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadButtonElement = imageUploadFormElement.querySelector('#upload-file');
const imageUploadOverlayElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const buttonCloseUploadOverlayElement = imageUploadFormElement.querySelector('#upload-cancel');

const openImageEditingForm = () => {
  imageUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => onImageEditingFormClosePressedEsc(evt));
  buttonCloseUploadOverlayElement.addEventListener('click', (evt) => onImageEditingFormClosePressedButtonClose(evt));
};

const closeImageEditingForm = (evt) => {
  evt.preventDefault();
  imageUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imageUploadFormElement.reset();
  document.removeEventListener('keydown', (evt) => onImageEditingFormClosePressedEsc(evt));
  buttonCloseUploadOverlayElement.removeEventListener('click', (evt) => onImageEditingFormClosePressedEsc(evt));
};

const onImageEditingFormClosePressedEsc = (evt) => {
  if(isEscPressed(evt)) {
    closeImageEditingForm(evt);
  }
};

const onImageEditingFormClosePressedButtonClose = (evt) => {
  if(isClick(evt)) {
    closeImageEditingForm(evt);
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
