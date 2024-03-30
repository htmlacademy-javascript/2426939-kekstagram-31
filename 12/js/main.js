import { getData } from './api.js';
import { renderPhotoList, createErrorComment } from './thumbnails.js';
import { adjustSort } from './sort.js';
import './fullscreen.js';
import './form.js';
import './util.js';
import './image-scale.js';
import './range-slider.js';

getData()
  .then((data) => {
    renderPhotoList(data);
    adjustSort(data);
  })
  .catch(() => {
    createErrorComment();
  });
