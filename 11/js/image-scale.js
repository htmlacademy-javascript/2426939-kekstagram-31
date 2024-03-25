const STEP = 25;
const MIN_LIMIT = 25;
const MAX_LIMIT = 100;
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleInputValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview');
let number = parseInt(scaleInputValue.value, 10);

const changeRange = () => {
  image.style.transform = `scale(${number / 100})`;
};

scaleSmallerButton.addEventListener('click', () => {
  if (number === MIN_LIMIT) {
    scaleSmallerButton.disabled = true;
  } else {
    scaleBiggerButton.disabled = false;
    number -= STEP;
    scaleInputValue.value = `${number}%`;
    changeRange();
  }
});

scaleBiggerButton.addEventListener('click', () => {
  if (number === MAX_LIMIT) {
    scaleBiggerButton.disabled = true;
  } else {
    scaleSmallerButton.disabled = false;
    number += STEP;
    scaleInputValue.value = `${number}%`;
    changeRange();
  }
});
