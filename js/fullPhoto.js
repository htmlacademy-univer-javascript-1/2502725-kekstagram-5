const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const photoCaption = bigPictureElement.querySelector('.social__caption');
const socialFooterText = bigPictureElement.querySelector('.social__footer-text');

const bodyElement = document.querySelector('body');

const commentFragment = document.createDocumentFragment();
const createComment = ({ name, avatar, message }) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  const imgComment = document.createElement('img');
  imgComment.classList.add('social__picture');
  imgComment.src = avatar;
  imgComment.alt = name;

  const textComment = document.createElement('p');
  textComment.classList.add('social__text');
  textComment.textContent = message;

  newComment.appendChild(imgComment);
  newComment.appendChild(textComment);
  commentFragment.appendChild(newComment);
};

let commentsShown = COMMENTS_STEP;
let currentComments = [];

const renderComments = () => {
  commentListElement.innerHTML = '';
  commentsShown = (commentsShown > currentComments.length) ? currentComments.length : commentsShown;

  if (commentsShown >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
  commentCountElement.childNodes[0].textContent = `${commentsShown} из `;
  commentCountElement.querySelector('.comments-count').textContent = `${currentComments.length}`;
  commentCountElement.classList.remove('hidden');
  currentComments.slice(0, commentsShown).forEach(createComment);

  commentListElement.appendChild(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  commentsShown += COMMENTS_STEP;
  renderComments();
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsShown = COMMENTS_STEP;
  currentComments = [];
  socialFooterText.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelbuttonClick = () => {
  hideBigPicture();
};

const showBigPhoto = (data) => {
  const {url, likes, description, comments} = data;

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  photoCaption.textContent = description;

  currentComments = comments.slice();
  renderComments();

  commentsLoaderElement.addEventListener('click', onLoadCommentsButtonClick);

  document.addEventListener('keydown', onDocumentKeydown);
};

cancelButtonElement.addEventListener('click', onCancelbuttonClick);

export { showBigPhoto };
