const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const PICTURES_COUNT = 10;
const filterContainer = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
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
    case Filter.RANDOM:
      return sortRandom(pictures.slice());
    case Filter.DISCUSSED:
      return sortByComments(pictures.slice());
    default:
      return pictures.slice();
  }
};

const setOnFilterClick = (callback) => {
  filterContainer.addEventListener('click', (evt) => {
    const target = evt.target;

    if (!target.classList.contains('img-filters__button') || target.id === currentFilter) {
      return;
    }
    filterContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
    currentFilter = target.id;

    callback(getFilteredPictures());
  });
};

const initFilters = (loadedPictures, callback) => {
  pictures = loadedPictures.slice();
  filterContainer.classList.remove('img-filters--inactive');

  const debouncedCallback = debounce(callback, 500);
  setOnFilterClick(debouncedCallback);
};

export { initFilters };
