const STEP = 0.25;
const MAX_NUMBER = 1;
const NUMBER = 100;
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleInputValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview').children[0];
let limit = 1;

const scaleReset = () => {
  limit = 1;
  image.style.transform = `scale(${limit})`;
};

scaleSmallerButton.addEventListener('click', () => {
  if (limit > STEP) {
    image.style.transform = `scale(${limit -= STEP})`;
    scaleInputValue.value = `${limit * NUMBER}%`;
  }
});

scaleBiggerButton.addEventListener('click', () => {
  if (limit < MAX_NUMBER) {
    image.style.transform = `scale(${limit += STEP})`;
    scaleInputValue.value = `${limit * NUMBER}%`;
  }
});

export {scaleReset};
