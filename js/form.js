import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccesMessage } from './message.js';
import { initValidation, pristineValid, resetValidator } from './validation.js';


const SUBMIT_BUTTON_TEXT = {
  default: 'Опубликовать',
  sending: 'Отправка...'
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadButtonElement = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');
const body = document.body;

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristineValid();
});

const showForm = () => {
  resetValidator();
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

};

const closeForm = () => {
  resetEffects();
  resetScale();
  imgUploadForm.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetValidator();
};

function onDocumentKeydown(evt) {
  const isInputFocused = [textHashtags, textDescription].some((el) => el === evt.target);
  if (evt.key === 'Escape' && !isInputFocused){
    evt.preventDefault();
    closeForm();
  }
}

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = SUBMIT_BUTTON_TEXT.sending;
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = SUBMIT_BUTTON_TEXT.default;
};

const setUserFormSubmit = (onSuccess) => {
  initValidation();
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristineValid()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccesMessage();
          onSuccess();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
  uploadButtonElement.addEventListener('change', () => {
    const file = uploadButtonElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));
    if (matches) {
      imagePreviewElement.src = URL.createObjectURL(file);
      effectsPreviewElement.forEach((effect) => {
        effect.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      });
      imgUploadForm.addEventListener('change', showForm);
    } else {
      imgUploadForm.removeEventListener('change', showForm);
      showErrorMessage();
      closeForm();
    }
  });
};

imgUploadCancel.addEventListener('keydown', onDocumentKeydown);
imgUploadCancel.addEventListener('click', closeForm);


export { setUserFormSubmit, closeForm };
