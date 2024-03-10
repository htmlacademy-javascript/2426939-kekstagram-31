import { isEscapeKey } from './util.js';
import { pictures, photoData } from './thumbnails.js';


const popup = document.querySelector('.big-picture');
const image = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentTotalCount = document.querySelector('.social__comment-total-count');
const descriptionPhoto = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const body = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');


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

const pictureDataFragment = document.createDocumentFragment();

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

const createComments = (comments) => {
  socialComments.innerHTML = '';
  comments.forEach((comment) => {
    createElement(comment);
  });
  socialComments.append(pictureDataFragment);
};

pictures.addEventListener('click', (evt) => {
  photoData.forEach(({ id, url, likes, description, comments}) => {
    if (Number(evt.target.closest('.picture').dataset.id) === id) {
      image.children[0].src = url;
      likesCount.textContent = likes;
      descriptionPhoto.textContent = description;
      commentTotalCount.textContent = comments.length;
      body.classList.add('modal-open');
      createComments(comments);
      openPopup();
    }
  });

  closeButton.addEventListener('click', () => {
    closePopup();
  });
});

