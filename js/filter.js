const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const PICTURES_COUNT = 10;
const filterElement = document.querySelector('.img-filters');
let currentFilter = FILTER.DEFAULT;
let pictures = [];

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const sortRandom = (items) => items.sort(() => Math.random() - Math.random()).slice(0, PICTURES_COUNT);

const sortByComments = (items) => items.sort((photoFirst, photoSecond) => photoSecond.comments.length - photoFirst.comments.length);

const getFilteredPictures = () => {
  switch (currentFilter) {
    case FILTER.RANDOM:
      return sortRandom(pictures.slice());
    case FILTER.DISCUSSED:
      return sortByComments(pictures.slice());
    default:
      return pictures.slice();
  }
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    const target = evt.target;

    if (!target.classList.contains('img-filters__button') || target.id === currentFilter) {
      return;
    }
    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
    currentFilter = target.id;

    callback(getFilteredPictures());
  });
};

const initFilters = (loadedPictures, callback) => {
  pictures = loadedPictures.slice();
  filterElement.classList.remove('img-filters--inactive');

  const debouncedCallback = debounce(callback, 500);
  setOnFilterClick(debouncedCallback);
};

export { initFilters };
