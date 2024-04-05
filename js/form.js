import { isEscapeKey, openPopup, closePopup } from './util.js';
import { sendData } from './api.js';
import { scaleReset } from './image-scale.js';
const FILE_TYPES = ['jpg', 'png', 'jpeg'];
const REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const LIMIT_OF_HASHTAG = 5;
const LIMIT_OF_COMMENT = 140;
const SubmitButtonTexts = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуется...'
};
const body = document.querySelector('body');
const uploadButton = document.querySelector('.img-upload__input');
const sumbitButton = document.querySelector('.img-upload__submit');
const popup = document.querySelector('.img-upload__overlay');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const form = document.querySelector('.img-upload__form');
const uploadButtonClose = popup.querySelector('.img-upload__cancel');
const hashtag = document.querySelector('.text__hashtags');
const image = document.querySelector('.img-upload__preview').children[0];
const textComment = popup.querySelector('.text__description');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;
const templateSuccessForm = templateSuccess.querySelector('.success');
const templateErrorForm = templateError.querySelector('.error');
const errorButton = templateErrorForm.querySelector('.error__button');
const effectPreviews = document.querySelectorAll('.effects__preview  ');

// Создание экземпляра валидатора
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'information__error'
}, false);

const resetAllData = () => {
  sliderElement.noUiSlider.reset();
  body.classList.remove('modal-open');
  scaleReset();
  form.reset();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (evt.target === hashtag || evt.target === textComment) {
      evt.stopPropagation();
    } else {
      closePopup(popup, onDocumentKeydown);
      resetAllData();
    }
  }
};

const addPhoto = () => {
  const file = uploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((element) => fileName.endsWith(element));
  if (matches) {
    effectPreviews.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
    image.src = URL.createObjectURL(file);
  }
};

const blockSubmitButton = () => {
  sumbitButton.disabled = true;
  sumbitButton.textContent = SubmitButtonTexts.SENDING;
};

const unblockSubmitButton = () => {
  sumbitButton.disabled = false;
  sumbitButton.textContent = SubmitButtonTexts.IDLE;
};

uploadButton.addEventListener('change', () => {
  openPopup(popup, onDocumentKeydown);
  sliderContainer.classList.add('hidden');
  body.classList.add('modal-open');
  addPhoto();
});

uploadButtonClose.addEventListener('click', () => {
  closePopup(popup, onDocumentKeydown);
  resetAllData();
});

// Функция для проверки валидности хэштега
const validateHashtagName = (hashtags) => {
  hashtags = hashtag.value.trim().split(' ').filter(Boolean);
  if (hashtag.value === '') {
    return true;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if (!REGEX.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

// Функция для проверки количества введеных хэштегов
const validateHashtagAmount = () => hashtag.value.trim().split(' ').filter(Boolean).length <= LIMIT_OF_HASHTAG;

// Функция для проверки одинаковых хэштегов
const validateHashtagSimilar = (hashtags) => {
  const hashtagArr = hashtags.toLowerCase().trim().split(' ').filter(Boolean);
  const uniqueHashtags = [...new Set(hashtagArr)];
  return hashtagArr.length === uniqueHashtags.length;
};

// Функция для проверки количества символов в комментарии
const validateLimitOfComment = () => textComment.value.length <= LIMIT_OF_COMMENT;

pristine.addValidator(
  hashtag,
  validateHashtagName,
  'Неправильно введен хэштег'
);

pristine.addValidator(
  hashtag,
  validateHashtagAmount,
  'Превышен лимит хэштегов. Максимум 5 доступно'
);

pristine.addValidator(
  hashtag,
  validateHashtagSimilar,
  'Нельзя использовать один и тот же хэштег дважды'
);

pristine.addValidator(
  textComment,
  validateLimitOfComment,
  'Превышен предел по количеству символов'
);

const onMessageClose = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)) {
    existElement.remove();
    body.removeEventListener('click', onMessageClose);
    body.removeEventListener('keydown', onMessageClose);
  }
};

const appendMessage = (template) => {
  const messageNode = template.cloneNode(true);
  body.append(messageNode);
  body.addEventListener('click', onMessageClose);
  body.addEventListener('keydown', onMessageClose);
};

const setUserForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if (valid) {
      blockSubmitButton();
      pristine.reset();
      sendData(new FormData(evt.target))
        .then(() => {
          appendMessage(templateSuccessForm);
          popup.classList.add('hidden');
          body.classList.remove('modal-open');
          evt.target.reset();
          sliderElement.noUiSlider.reset();
          form.reset();
        })
        .catch(() => {
          appendMessage(templateErrorForm);
        })
        .finally(() => unblockSubmitButton());
    }
  });
};

errorButton.addEventListener('click', () => {
  closePopup(templateErrorForm, onDocumentKeydown);
  templateErrorForm.remove();
});

setUserForm();


