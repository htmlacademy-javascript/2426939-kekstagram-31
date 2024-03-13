import { isEscapeKey } from './util.js';
import { pictures, photoData } from './thumbnails.js';

const LIMIT_OF_COMMENT = 5;
const body = document.querySelector('body');
const popup = document.querySelector('.big-picture');
const image = popup.querySelector('.big-picture__img');
const likesCount = popup.querySelector('.likes-count');
const commentShownCount = popup.querySelector('.social__comment-shown-count');
const commentTotalCount = popup.querySelector('.social__comment-total-count');
const descriptionPhoto = popup.querySelector('.social__caption');
const socialComments = popup.querySelector('.social__comments');
const closeButton = popup.querySelector('.big-picture__cancel');
const loadMoreButton = popup.querySelector('.comments-loader');
const pictureDataFragment = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    popup.classList.add('hidden');
  }
};

const openPopup = () => {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePopup = () => {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Создает комментарий
const createElement = (comment) => {
  const element = document.createElement('li');
  const newImage = document.createElement('img');
  const text = document.createElement('p');
  element.classList.add('social__comment');
  newImage.classList.add('social__picture');
  newImage.style.width = '35px';
  newImage.style.height = '35px';
  newImage.src = comment.avatar;
  newImage.alt = comment.name;
  element.append(newImage);
  text.classList.add('social__text');
  text.textContent = comment.message;
  element.append(text);
  pictureDataFragment.append(element);
};

// Создает список комментариев
const createComments = () => {
  let count = 0;
  return function (comments, index, limit) {
    for (let i = index; i < comments.length; i++) {
      createElement(comments[i]);
      count++;
      if (i >= limit) {
        break;
      }
    }
    commentShownCount.textContent = count;
    socialComments.append(pictureDataFragment);
    if (count === comments.length) {
      loadMoreButton.classList.add('hidden');
    }
  };
};

//Событие для открытия экрана
pictures.addEventListener('click', (evt) => {
  let index = 0;
  let limit = 4;
  const createElements = createComments();

  //Перебирает массив объектов с данными
  photoData.forEach(({ id, url, likes, description, comments }) => {
    const onLoadButtonClick = () => {
      index += LIMIT_OF_COMMENT;
      limit += LIMIT_OF_COMMENT;
      createElements(comments, index, limit);
    };
    if (Number(evt.target.closest('.picture').dataset.id) === id) {
      image.children[0].src = url;
      likesCount.textContent = likes;
      descriptionPhoto.textContent = description;
      commentTotalCount.textContent = comments.length;
      body.classList.add('modal-open');
      socialComments.innerHTML = '';
      createElements(comments, index, limit);
      openPopup();
      if (comments.length > LIMIT_OF_COMMENT) {
        loadMoreButton.classList.remove('hidden');
        loadMoreButton.addEventListener('click', onLoadButtonClick);
      } else {
        loadMoreButton.classList.add('hidden');
      }
    }

    //Событие, закрывающее окно
    closeButton.addEventListener('click', () => {
      closePopup();
      loadMoreButton.removeEventListener('click', onLoadButtonClick);
    });
  });
});

