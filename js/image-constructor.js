import {isEscPressed, isClick, removeСhildByClass} from './utils.js';

const COMMENTS_PER_UPLOAD = 5;
const bigImageContainerElement = document.querySelector('.big-picture');
const bigPicturePreviewElement = document.querySelector('.big-picture__preview');
const bigImageCancelElement = document.querySelector('.big-picture__cancel');
const templateImageElement = document.querySelector('#picture').content.querySelector('.picture');
const bigImageElement = document.querySelector('.big-picture__img').querySelector('img');
const descriptionImageElement = document.querySelector('.social__caption');
const likesCountElement = document.querySelector('.likes-count');
const socialCommentContainerElement = document.querySelector('.social__comment-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

const closeBigImage = () => {
  document.body.classList.remove('modal-open');
  bigImageContainerElement.classList.add('hidden');
  bigImageCancelElement.removeEventListener('click', (evt) => onBigImageClosedСlickedСancel(evt));
  document.removeEventListener('keydown', (evt) => onBigImageClosedPressedEsc(evt));
}

const onBigImageClosedСlickedСancel = (evt) => {
  if(isClick(evt)) {
    closeBigImage();
  }
}

const onBigImageClosedPressedEsc = (evt) => {
  if(isEscPressed(evt)) {
    closeBigImage();
  }
}

const createComment = (data) => {
  const comment = socialComment.cloneNode(true);

  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
}

const onImageClick = (evt, src, description, likes,comments) => {
  let arrayComments = Array.from(comments);
  let numberCurrentComments = comments.length > COMMENTS_PER_UPLOAD ? COMMENTS_PER_UPLOAD : comments.length;

  evt.preventDefault();

  document.body.classList.add('modal-open');
  bigImageContainerElement.classList.remove('hidden');

  bigImageCancelElement.addEventListener('click', (evt) => onBigImageClosedСlickedСancel(evt));
  document.addEventListener('keydown', (evt) => onBigImageClosedPressedEsc(evt));

  bigImageElement.src = src;
  descriptionImageElement.textContent = description;
  socialCommentContainerElement.textContent = `${numberCurrentComments} из ${arrayComments.length} комментариев`;
  likesCountElement.textContent = likes;

  commentsLoader.classList.remove('hidden');
  if(numberCurrentComments === comments.length) {
    commentsLoader.classList.add('hidden');
  }

  removeСhildByClass(socialComments, 'social__comment');
  for (let i = 0; i < COMMENTS_PER_UPLOAD && i < arrayComments.length; i++) {
    socialComments.append(createComment(arrayComments[i]));
  }

  commentsLoader.addEventListener('click', (evt) => {
    console.log(arrayComments)
    console.log(numberCurrentComments)
    evt.preventDefault()
    for (let i = numberCurrentComments; i < numberCurrentComments + COMMENTS_PER_UPLOAD && i < arrayComments.length; i++) {
      socialComments.append(createComment(arrayComments[i]));
      if( i === comments.length - 1) {
        commentsLoader.classList.add('hidden');
      }
    }
    numberCurrentComments = numberCurrentComments + COMMENTS_PER_UPLOAD < arrayComments.length ? numberCurrentComments + COMMENTS_PER_UPLOAD : arrayComments.length;
    socialCommentContainerElement.textContent = `${numberCurrentComments} из ${arrayComments.length} комментариев`;
  })
};

const createImage = (dataItem) => {
  const image = templateImageElement.cloneNode(true);

  image.querySelector('.picture__img').src = dataItem.url;
  image.querySelector('.picture__likes').textContent = dataItem.likes;
  image.querySelector('.picture__comments').textContent = dataItem.comments.length;
  image.addEventListener('click',(evt) => onImageClick(
    evt,
    dataItem.url,
    dataItem.description,
    dataItem.likes,
    dataItem.comments,
  ),
  );

  return image;
};

export {createImage};
