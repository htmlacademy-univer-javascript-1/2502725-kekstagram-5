const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFUALT_EFFECT = EFFECTS[0];

let currentEffect = DEFUALT_EFFECT;

const image = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

const openSlider = () => {
  sliderContainer.classList.remove('hidden');

};

const closeSlider = () => {
  sliderContainer.classList.add('hidden');

};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });

  if (currentEffect === DEFUALT_EFFECT) {
    closeSlider();
  } else {
    openSlider();
  }
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')){
    return;
  }

  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  image.className = `effects__preview--${currentEffect.name}`;

  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();

  if (currentEffect === DEFUALT_EFFECT) {
    image.style.filter = DEFUALT_EFFECT.style;
  } else {
    image.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  }

  effectLevel.value = sliderValue;
};

const resetEffects = () => {
  currentEffect = DEFUALT_EFFECT;
  updateSlider();
};

noUiSlider.create(slider, {
  range: {
    min: DEFUALT_EFFECT.min,
    max: DEFUALT_EFFECT.max,
  },
  start: DEFUALT_EFFECT.max,
  step: DEFUALT_EFFECT.step,
  connect: 'lower',
});

closeSlider();

effects.addEventListener('change', onEffectChange);
slider.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
