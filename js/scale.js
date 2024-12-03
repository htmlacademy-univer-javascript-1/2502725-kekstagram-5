const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const smallerScaleControl = document.querySelector('.scale__control--smaller');
const biggerScaleControl = document.querySelector('.scale__control--bigger');
const valueScaleControl = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const setScale = (scale) => {
  image.style.transform = `scale(${scale / 100})`;
  valueScaleControl.value = `${scale}%`;
};

const adjustScale = (adjustment) => {
  const currentScale = parseInt(valueScaleControl.value, 10);
  let newScale = currentScale + adjustment * SCALE_STEP;
  newScale = Math.min(Math.max(MIN_SCALE, newScale), MAX_SCALE);

  setScale(newScale);
};

const onSmallerControlClick = () => adjustScale(-1);
const onBiggerControlClick = () => adjustScale(1);

const resetScale = () => setScale(DEFAULT_SCALE);

smallerScaleControl.addEventListener('click', onSmallerControlClick);
biggerScaleControl.addEventListener('click', onBiggerControlClick);

export { resetScale };
