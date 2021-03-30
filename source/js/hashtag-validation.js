import {getArrayWords} from './utils.js';

const MAX_NUMBER_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;

const hashtagInputElement = document.querySelector('.text__hashtags');

const areEqual = (hashtags) => {
  const hashtagsАrray = hashtags.toLowerCase().split(' ');
  const uniqueHashtagsArray = [...new Set(hashtagsАrray)];
  return hashtagsАrray.length !== uniqueHashtagsArray.length;
};

const isGreaterThanMax = (hashtags) => {
  const hashtagsАrray = getArrayWords(hashtags);
  return hashtagsАrray.length > MAX_NUMBER_HASHTAGS;
};

const isLesThanMinLength = (hashtags) => {
  const hashtagsАrray = getArrayWords(hashtags);
  const arrayInvalidHashtags = hashtagsАrray.filter((hashtag) => hashtag.length < MIN_HASHTAG_LENGTH);
  return arrayInvalidHashtags.length !== 0;
};

const isLongerThanMaxLength = (hashtags) => {
  const hashtagsАrray = getArrayWords(hashtags);
  const arrayInvalidHashtags = hashtagsАrray.filter((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH);
  return arrayInvalidHashtags.length !== 0;
};

const isNotStartWithLattice = (hashtags) => {
  const hashtagsАrray = getArrayWords(hashtags);
  const arrayInvalidHashtags = hashtagsАrray.filter((hashtag) => hashtag.indexOf('#') !== 0);
  return arrayInvalidHashtags.length !== 0;
};

const handleValidation = () => {
  if(isNotStartWithLattice(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-тег должен начинаться с символа #');
  }
  else if(isLesThanMinLength(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-тег должен состоять минимум из 2 символов');
  }
  else if(isLongerThanMaxLength(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-тег не может состоять больше чем из 20 символов');
  }
  else if(isGreaterThanMax(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-тегов не может быть больше пяти');
  }
  else if(hashtagInputElement.validity.patternMismatch) {
    hashtagInputElement.setCustomValidity('Хэш-теги должены состоять только из букв и чисел и разделяться одним пробелом');
  }
  else if(areEqual(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-теги не должены повторяться.');
  }
  else {
    hashtagInputElement.setCustomValidity('');
  }
  hashtagInputElement.reportValidity();
};

hashtagInputElement.addEventListener('input', handleValidation)
