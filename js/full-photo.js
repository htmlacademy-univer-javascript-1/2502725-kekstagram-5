const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const photoCaption = bigPicture.querySelector('.social__caption');
const socialFooterText = bigPicture.querySelector('.social__footer-text');

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
  commentList.innerHTML = '';
  commentsShown = (commentsShown > currentComments.length) ? currentComments.length : commentsShown;

  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  commentCount.childNodes[0].textContent = `${commentsShown} из `;
  commentCount.querySelector('.comments-count').textContent = `${currentComments.length}`;
  commentCount.classList.remove('hidden');
  currentComments.slice(0, commentsShown).forEach(createComment);

  commentList.appendChild(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  commentsShown += COMMENTS_STEP;
  renderComments();
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

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

const showBigPhoto = ({url, description, likes, comments}) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  photoCaption.textContent = description;

  currentComments = comments.slice();
  renderComments();

  commentsLoader.addEventListener('click', onLoadCommentsButtonClick);

  document.addEventListener('keydown', onDocumentKeydown);
};

cancelButton.addEventListener('click', onCancelbuttonClick);

export { showBigPhoto };
