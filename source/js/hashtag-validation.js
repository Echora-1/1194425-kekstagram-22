const MAX_NUMBER_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;

const hashtagInputElement = document.querySelector('.text__hashtags');

const isIdenticalHashtags = (hashtags) => {
  const hashtagsАrray = hashtags.toLowerCase().split(' ');
  const uniqueHashtagsArray = [...new Set(hashtagsАrray)];
  return hashtagsАrray.length !== uniqueHashtagsArray.length;
};

const hashtagsMoreMaximum = (hashtags) => {
  const hashtagsАrray = hashtags.split(' ').filter((element) => element.length > 0 );
  return hashtagsАrray.length > MAX_NUMBER_HASHTAGS;
};

const isHashtagLessMinLength = (hashtags) => {
  const hashtagsАrray = hashtags.split(' ').filter((element) => element.length > 0 );
  const arrayInvalidHashtags = hashtagsАrray.filter((hashtag) => hashtag.length < MIN_HASHTAG_LENGTH);
  return arrayInvalidHashtags.length !== 0;
};

const isHashtagLongerMaxLength = (hashtags) => {
  const hashtagsАrray = hashtags.split(' ').filter((element) => element.length > 0 );
  const arrayInvalidHashtags = hashtagsАrray.filter((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH);
  return arrayInvalidHashtags.length !== 0;
};

const isWrongStartHashtag = (hashtags) => {
  const hashtagsАrray = hashtags.split(' ').filter((element) => element.length > 0 );
  const arrayInvalidHashtags = hashtagsАrray.filter((hashtag) => hashtag.indexOf('#') !== 0);
  return arrayInvalidHashtags.length !== 0;
};

const onHashtagsValidation = () => {
  if(isWrongStartHashtag(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-тег должен начинаться с символа #');
  }
  else if(isHashtagLessMinLength(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-тег должен состоять минимум из 2 символов');
  }
  else if(isHashtagLongerMaxLength(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-тег не может состоять больше чем из 20 символов');
  }
  else if(hashtagsMoreMaximum(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-тегов не может быть больше пяти');
  }
  else if(hashtagInputElement.validity.patternMismatch) {
    hashtagInputElement.setCustomValidity('Хэш-теги должены состоять только из букв и чисел и разделяться одним пробелом');
  }
  else if(isIdenticalHashtags(hashtagInputElement.value)) {
    hashtagInputElement.setCustomValidity('Хэш-теги не должены повторяться.');
  }
  else {
    hashtagInputElement.setCustomValidity('');
  }
  hashtagInputElement.reportValidity();
};

hashtagInputElement.addEventListener('input', onHashtagsValidation)
