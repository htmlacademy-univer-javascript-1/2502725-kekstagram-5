import {renderGallery} from './gallery.js';
import './form.js';
import './effects.js';
import './scale.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { setUserFormSubmit, closeForm } from './form.js';


getData()
  .then((photos) => {
    renderGallery(photos);
  })
  .catch((error) => {
    showAlert(error.message);
  });


setUserFormSubmit(closeForm);
