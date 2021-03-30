import noUiSlider from 'nouislider';
import {removeClasses} from './utils.js';

const CHROME_OPTIONS = {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
};
const SEPIA_OPTIONS = {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
};
const MARVIN_OPTIONS = {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
};
const PHOBOS_OPTIONS = {
  range: {
    min: 0,
    max: 3,
  },
  step: 0.1,
  start: 3,
};
const HEAT_OPTIONS = {
  range: {
    min: 1,
    max: 3,
  },
  step: 0.1,
  start: 3,
};
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const effectsСontainerElement = document.querySelector('.img-upload__effects');
const previewСontainerElement = document.querySelector('.img-upload__preview');
const imagePreviewElement = previewСontainerElement.querySelector('img');
const defaultEffectElement = document.querySelector('.effects__radio:checked');

const setOriginalState = () => {
  imagePreviewElement.style.removeProperty('filter');
  sliderContainerElement.classList.add('visually-hidden');
  removeClasses(imagePreviewElement, 'effects__preview--');
};

const setOptionsEffect = (currentEffect) => {
  switch(currentEffect.value) {
    case 'chrome':
      sliderElement.noUiSlider.updateOptions(CHROME_OPTIONS);
      break;
    case 'sepia':
      sliderElement.noUiSlider.updateOptions(SEPIA_OPTIONS);
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions(MARVIN_OPTIONS);
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions(PHOBOS_OPTIONS);
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions(HEAT_OPTIONS);
      break;
    case 'none':
      setOriginalState();
      break;
    default:
      break;
  }
};

const setStyleEffect = (currentEffect) => {
  switch(currentEffect.value) {
    case 'chrome':
      return 'grayscale';
    case 'sepia':
      return 'sepia';
    case 'marvin':
      return 'invert';
    case 'phobos':
      return 'blur';
    case 'heat':
      return 'brightness';
    default:
      break;
  }
};

const setEffectUnits = (currentEffect) => {
  switch(currentEffect.value) {
    case 'marvin':
      return '%';
    case 'phobos':
      return 'px';
    default:
      return '';
  }
};

const onEffectChecked = () => {
  const currentEffect = document.querySelector('.effects__radio:checked');
  removeClasses(imagePreviewElement, 'effects__preview--');
  if(currentEffect.value !== 'none') {
    sliderContainerElement.classList.remove('visually-hidden');
    imagePreviewElement.classList.add(`effects__preview--${currentEffect.value}`);
  }
  setOptionsEffect(currentEffect);
};

effectsСontainerElement.addEventListener('change', onEffectChecked);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', (values, handle) => {
  const currentEffect = document.querySelector('.effects__radio:checked');
  sliderValueElement.value = values[handle];
  imagePreviewElement.style.filter = `${setStyleEffect(currentEffect)}(${sliderValueElement.value}${setEffectUnits(currentEffect)})`;
});

setOptionsEffect(defaultEffectElement);

export {setOriginalState};
