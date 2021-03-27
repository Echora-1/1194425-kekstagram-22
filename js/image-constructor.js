import {isEscPressed, isClick, removeСhildByClass} from './utils.js';

const COMMENTS_PER_UPLOAD = 5;
const bigImageContainerElement = document.querySelector('.big-picture');
const bigImageCancelElement = document.querySelector('.big-picture__cancel');
const templateImageElement = document.querySelector('#picture').content.querySelector('.picture');
const bigImageElement = document.querySelector('.big-picture__img').querySelector('img');
const descriptionImageElement = document.querySelector('.social__caption');
const likesCountElement = document.querySelector('.likes-count');
const socialCommentContainerElement = document.querySelector('.social__comment-count');
const socialCommentsElement = document.querySelector('.social__comments');
const socialCommentElement = document.querySelector('.social__comment');
const commentsLoaderElement = document.querySelector('.comments-loader');

const createComment = (data) => {
  const comment = socialCommentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
}

const uploadСomments = (currentComments, comments) => {
  return () => {
    for (let i = currentComments; i <currentComments + COMMENTS_PER_UPLOAD && i < comments.length; i++) {
      socialCommentsElement.append(createComment(comments[i]));
      if( i === comments.length - 1) {
        commentsLoaderElement.classList.add('hidden');
      }
    }
    currentComments = currentComments + COMMENTS_PER_UPLOAD < comments.length ? currentComments + COMMENTS_PER_UPLOAD : comments.length;
    socialCommentContainerElement.textContent = `${currentComments} из ${comments.length} комментариев`;
  }
};

const onImageClick = (evt, src, description, likes,comments) => {
  const arrayComments = Array.from(comments);
  let numberCurrentComments = comments.length > COMMENTS_PER_UPLOAD ? COMMENTS_PER_UPLOAD : comments.length;
  const onLoaderClick = uploadСomments(numberCurrentComments, arrayComments);

  evt.preventDefault();

  const closeBigImage = () => {
    document.body.classList.remove('modal-open');
    bigImageContainerElement.classList.add('hidden');
    bigImageCancelElement.removeEventListener('click', (evt) => onBigImageClosedСlickedСancel(evt));
    document.removeEventListener('keydown', (evt) => onBigImageClosedPressedEsc(evt));
    commentsLoaderElement.removeEventListener('click', onLoaderClick);
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

  document.body.classList.add('modal-open');
  bigImageContainerElement.classList.remove('hidden');

  bigImageCancelElement.addEventListener('click', (evt) => onBigImageClosedСlickedСancel(evt));
  document.addEventListener('keydown', (evt) => onBigImageClosedPressedEsc(evt));

  bigImageElement.src = src;
  descriptionImageElement.textContent = description;
  socialCommentContainerElement.textContent = `${numberCurrentComments} из ${arrayComments.length} комментариев`;
  likesCountElement.textContent = likes;

  commentsLoaderElement.classList.remove('hidden');
  if(numberCurrentComments === arrayComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }

  removeСhildByClass(socialCommentsElement, 'social__comment');
  for (let i = 0; i < COMMENTS_PER_UPLOAD && i < arrayComments.length; i++) {
    socialCommentsElement.append(createComment(arrayComments[i]));
  }

  commentsLoaderElement.addEventListener('click', onLoaderClick);
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
