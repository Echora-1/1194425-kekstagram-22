const SCALE_DEFAULT_VALUE = 100;
const SCALE_MAX_VALUE = 100;
const SCALE_MIN_VALUE = 25;
const SCALE_STEP = 25;
const scaleValueElement = document.querySelector('.scale__control--value');
const decreaseButtonElement = document.querySelector('.scale__control--smaller');
const increaseButtonElement = document.querySelector('.scale__control--bigger');
const previewСontainerElement = document.querySelector('.img-upload__preview');
const imagePreviewElement = previewСontainerElement.querySelector('img');

const resetScale = () => {
  scaleValueElement.value = `${SCALE_DEFAULT_VALUE}%`;
  imagePreviewElement.style.transform = 'scale(1)';
};

resetScale();

const decreaseScale = () => {
  if(Number.parseInt(scaleValueElement.value) > SCALE_MIN_VALUE) {
    imagePreviewElement.style.transform = `scale(${(parseInt(scaleValueElement.value) - SCALE_STEP) / 100})`;
    scaleValueElement.value = `${Number.parseInt(scaleValueElement.value) - SCALE_STEP}%`;
  }
}

const increaseScale = () => {
  if(Number.parseInt(scaleValueElement.value) < SCALE_MAX_VALUE) {
    imagePreviewElement.style.transform = `scale(${(parseInt(scaleValueElement.value) + SCALE_STEP) / 100})`;
    scaleValueElement.value = `${Number.parseInt(scaleValueElement.value) + SCALE_STEP}%`;
  }
}

decreaseButtonElement.addEventListener('click', decreaseScale)
increaseButtonElement.addEventListener('click', increaseScale)

export {resetScale};
