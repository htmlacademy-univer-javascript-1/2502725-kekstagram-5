const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

let currentMessage = null;

const checkTypeMessage = () => document.querySelector('.success, .error');

const closeMessage = () => {
  document.removeEventListener('keydown', onEscKeyDown);
  document.removeEventListener('click', onOutsideClick);

  const messageElement = checkTypeMessage();
  if (messageElement) {
    messageElement.remove();
  }
};

function onEscKeyDown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage();
  }
}

function onOutsideClick (evt) {
  if (!evt.target.closest('div')) {
    closeMessage();
  }
}

const onCloseButtonClick = () => closeMessage();

const openMessage = (message, buttonSelector) => {
  currentMessage = message;
  document.body.appendChild(currentMessage);
  currentMessage.querySelector(buttonSelector).addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
  document.body.addEventListener('click', onOutsideClick);
};


const showErrorMessage = () => openMessage(errorMessage, '.error__button');
const showSuccesMessage = () => openMessage(successMessage, '.success__button');

export { showErrorMessage, showSuccesMessage };


