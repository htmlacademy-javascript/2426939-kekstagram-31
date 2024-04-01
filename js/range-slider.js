const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const inputValue = document.querySelector('.effect-level__value');
const items = document.querySelectorAll('.effects__item');
const image = document.querySelector('.img-upload__preview').children[0];
const STEP = 0.1;
const MARVIN_STEP = 1;
const MIN = 0;
const HEAT_MIN = 1;
const MAX = 1;
const MARVIN_MAX = 100;
const PHOBOS_MAX = 3;

// Создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
});

// Функция, возвращающая значение для фильтра
const addEffect = (value, index) => {
  switch (index) {
    case 1:
      return `grayscale(${value})`;
    case 2:
      return `sepia(${value})`;
    case 3:
      return `invert(${value}%)`;
    case 4:
      return `blur(${value}px)`;
    case 5:
      return `brightness(${value})`;
  }
};

// Функция, задающая значение интенсивности эффекта при изменении
const updateSlider = (index) => {
  sliderElement.noUiSlider.on('update', () => {
    inputValue.value = sliderElement.noUiSlider.get();
    image.style.filter = addEffect(inputValue.value, index);
  });
};

// Функция для изменения настроек слайдера
const changeSliderOptions = (min, max, step) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: 0,
    step: step
  });
};

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', () => {
    inputValue.value = 0;
    if (i === 0) {
      sliderContainer.classList.add('hidden');
      image.style.filter = '';
    } else {
      sliderContainer.classList.remove('hidden');
      switch (i) {
        case 1:
          changeSliderOptions(MIN, MAX, STEP);
          break;
        case 2:
          changeSliderOptions(MIN, MAX, STEP);
          break;
        case 3:
          changeSliderOptions(MIN, MARVIN_MAX, MARVIN_STEP);
          break;
        case 4:
          changeSliderOptions(MIN, PHOBOS_MAX, STEP);
          break;
        case 5:
          changeSliderOptions(HEAT_MIN, PHOBOS_MAX, STEP);
          break;
      }
      updateSlider(i);
    }
  });
}

export {changeSliderOptions};
