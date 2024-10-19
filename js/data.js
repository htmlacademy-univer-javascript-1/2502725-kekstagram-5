import {checkIds, getRandomArrayElement, getRandomInteger} from './util.js';

const DESCRIPTIONS = [
  'Потрясающий закат над морем.',
  'Веселая компания друзей на пикнике.',
  'Горы в облаках — это просто волшебно.',
  'Уютный вечер у камина.',
  'Невероятная архитектура старинного города.',
  'Солнечный день в парке.',
  'Тихий уголок природы.',
  'Фотография с путешествия по Европе.',
  'Детские улыбки — лучшее, что есть на свете.',
  'Морская прогулка на яхте.'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Алексей',
  'Мария',
  'Иван',
  'Анна',
  'Дмитрий',
  'Елена',
  'Сергей',
  'Ольга'
];


function generateComments(numComments) {
  const comments = [];
  const usedCommentIds = new Set();

  for (let i = 0; i < numComments; i++) {
    const commentId = checkIds(usedCommentIds, 100);

    usedCommentIds.add(commentId);

    comments.push({
      id: commentId,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(COMMENT_MESSAGES),
      name: getRandomArrayElement(NAMES)
    });
  }

  return comments;
}

function generatePhotos() {
  const photos = [];
  const usedPhotoIds = new Set();

  for (let i = 1; i <= 25; i++) {
    const photoId = checkIds(usedPhotoIds, 25);

    usedPhotoIds.add(photoId);

    photos.push({
      id: photoId,
      url: `photos/${photoId}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: generateComments(getRandomInteger(0, 30))
    });
  }
  return photos;
}

export {generatePhotos};
