import {renderGallery} from './gallery.js';
import './form.js';
import './effects.js';
import './scale.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { setUserFormSubmit, closeForm } from './form.js';
import { initFilters } from './filter.js';


setUserFormSubmit(closeForm);

(async () => {
  getData()
    .then((photos) => {
      renderGallery(photos);
      initFilters(photos, (filteredPhotos) => {
        document.querySelectorAll('.picture').forEach((element) => element.remove());
        renderGallery(filteredPhotos);
      });
    })
    .catch((error) => {
      showAlert(error.message);
    });
})();
