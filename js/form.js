import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccesMessage } from './message.js';
import { initValidation, pristineValid, resetValidator } from './validation.js';


const SubmitButtonText = {
  default: 'Опубликовать',
  sending: 'Отправка...'
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadButton = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const body = document.body;

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristineValid();
});

const onShowForm = () => {
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

const onCloseForm = () => {
  closeForm();
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
  imgUploadSubmit.textContent = SubmitButtonText.sending;
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = SubmitButtonText.default;
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
  uploadButton.addEventListener('change', () => {
    const file = uploadButton.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));
    if (matches) {
      imagePreview.src = URL.createObjectURL(file);
      effectsPreview.forEach((effect) => {
        effect.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      });
      imgUploadForm.addEventListener('change', onShowForm);
    } else {
      imgUploadForm.removeEventListener('change', onShowForm);
      showErrorMessage();
      closeForm();
    }
  });
};

imgUploadCancel.addEventListener('keydown', onDocumentKeydown);
imgUploadCancel.addEventListener('click', onCloseForm);


export { setUserFormSubmit, closeForm };
