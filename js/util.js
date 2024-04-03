const NUMBER_SYSTEM_CALCULUS = 10;
const MIN = 0;
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandom = (min, max) => {
  const arrays = [];
  return function () {
    let number = getRandomInteger(min, max);
    if (arrays.length >= max - min + 1) {
      return null;
    }
    while (arrays.includes(number)) {
      number = getRandomInteger(min, max);
    }
    arrays.push(number);
    return number;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const openPopup = (popup, onDocumentKeydown) => {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePopup = (popup, onDocumentKeydown) => {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const getNumber = (string) => {
  let number = '';
  string = string.toString().replaceAll(' ', '');
  for (let i = 0; i < string.length; i++) {
    if (isNaN(string[i])) {
      number += '';
    } else {
      number += parseInt(string[i], NUMBER_SYSTEM_CALCULUS);
    }
  }
  if (string < MIN) {
    number *= 1;
  }
  return (number === '') ? 'NaN' : number;
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export { getRandomInteger, getRandom, isEscapeKey, openPopup, closePopup, debounce, getNumber };
