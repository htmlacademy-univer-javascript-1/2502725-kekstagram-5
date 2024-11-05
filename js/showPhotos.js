import {generatePhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');

const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photos = generatePhotos();

const photosFragment = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
  const newPhoto = photoTemplate.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__img').alt = description;
  newPhoto.querySelector('.picture__likes').textContent = likes;
  newPhoto.querySelector('.picture__comments').textContent = comments.length;
  photosFragment.appendChild(newPhoto);
});

picturesContainer.appendChild(photosFragment);

