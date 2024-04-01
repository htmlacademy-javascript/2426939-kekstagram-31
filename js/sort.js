import { renderPhotoList } from './thumbnails.js';
import { debounce } from './util.js';
const MIN_PHOTO_COUNT = 0;
const MAX_PHOTO_COUNT = 10;
const NUMBER = 0.5;
const imgFilters = document.querySelector('.img-filters');
const debounceRender = debounce(renderPhotoList);
let currentFilter = 'filter-default';
let photos = [];

const addSort = () => {
  let sortPhotos = [];
  if (currentFilter === 'filter-default') {
    sortPhotos = photos;
  }
  if (currentFilter === 'filter-random') {
    sortPhotos = photos.toSorted(() => NUMBER - Math.random()).slice(MIN_PHOTO_COUNT,MAX_PHOTO_COUNT);
  }
  if (currentFilter === 'filter-discussed') {
    sortPhotos = photos.toSorted((a,b) => b.comments.length - a.comments.length);
  }
  debounceRender(sortPhotos);
};

const onSortChange = (evt) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.toggle('img-filters__button--active');
  evt.target.classList.toggle('img-filters__button--active');
  currentFilter = evt.target.getAttribute('id');
  addSort();
};

const adjustSort = (photoData) => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', onSortChange);
  photos = photoData;
};

export {adjustSort};


