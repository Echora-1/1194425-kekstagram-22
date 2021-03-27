import {createImage} from './image-constructor.js';
import {removeСhildByClass, getRandomFloatFromRange, setThrottle} from './utils.js';

const THROTTLE_TIME = 500;
const MAX_RANDOM_IMAGE = 10;
const imageContainerElement = document.querySelector('.pictures');
const imageFilterElement = document.querySelector('.img-filters');
const filterButtonsContainerElement = document.querySelector('.img-filters__form');
const filterButtonsElements = document.querySelectorAll('.img-filters__button');

const setActiveStatus = (evt) => {
  if(!(evt.target.classList.contains('img-filters__button--active'))) {
    Array.from(filterButtonsElements).forEach(button => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
  }
}

const onFilterDefaultPresed = (evt, photos) => {
  setActiveStatus(evt);
  removeСhildByClass(imageContainerElement, 'picture');
  photos.forEach(item => {
    imageContainerElement.append(createImage(item));
  })
}

const onFilterRandomPresed = (evt, photos) => {
  const tenRandomIndices = [];
  const tenRandomPhotos = [];

  setActiveStatus(evt);
  removeСhildByClass(imageContainerElement, 'picture');
  for (let i = 0; i < MAX_RANDOM_IMAGE && i < photos.length; i = tenRandomIndices.length) {
    const index = getRandomFloatFromRange(0, photos.length - 1);
    if(!(tenRandomIndices.includes(index, 0))){
      tenRandomIndices.push(index);
      tenRandomPhotos.push(photos[index]);
    }
  }
  tenRandomPhotos.forEach(item => {
    imageContainerElement.append(createImage(item));
  })
}

const onFilterDiscussedPresed = (evt, photos) => {
  const sortPhotos = photos.slice().sort((firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length);
  setActiveStatus(evt);
  removeСhildByClass(imageContainerElement, 'picture');
  sortPhotos.forEach(item => {
    imageContainerElement.append(createImage(item));
  })
}

const onFilterButtonsClick = (evt, photos) => {
  if (evt.target.classList.contains('img-filters__button')) {
    switch(evt.target.id) {
      case 'filter-default':
        onFilterDefaultPresed(evt, photos);
        break;
      case 'filter-random':
        onFilterRandomPresed(evt, photos);
        break;
      case 'filter-discussed':
        onFilterDiscussedPresed(evt, photos);
        break;
    }
  }
}

const showImageFilter = (photos) => {
  imageFilterElement.classList.remove('img-filters--inactive');
  filterButtonsContainerElement.addEventListener('click', setThrottle((evt) => onFilterButtonsClick(evt, photos), THROTTLE_TIME));
}


export {showImageFilter};
