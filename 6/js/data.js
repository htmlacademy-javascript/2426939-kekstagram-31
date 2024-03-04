import { getRandomInteger, getRandom } from './get-random.js';
const DESCRIPTION = [
  'Передо мной цветная/черно-белая фотография',
  'Морозным утром город укутался в снежное одеяло, превратившись в сказочную зимнюю страну чудес.',
  'На вершине горы открывается потрясающий вид на бескрайние просторы, где сливаются воедино небо и земля.',
  'Старинные улочки города дышат историей и очарованием, перенося нас в другую эпоху.',
  'В глазах этого ребенка отражается весь мир, полный невинности, любопытства и надежды.',
  'Этот снимок запечатлел момент чистой радости и веселья, когда друзья собрались вместе, чтобы разделить счастливые мгновения.',
  'В этом кадре художник мастерски передал игру света и тени, создав поистине завораживающее произведение искусства.',
  'Этот снимок напоминает нам о том, что даже в самых обыденных вещах можно найти красоту и поэзию.',
  'Фотография передает всю мощь и величие природы, заставляя нас почувствовать себя частью чего-то большего.',
  'В этом кадре фотограф сумел уловить мимолетное мгновение, которое рассказывает целую историю.',
  'Этот снимок запечатлел момент единения человека и природы, когда границы между ними стираются.',
  'Фотография передает всю красоту и хрупкость нашего мира, напоминая нам о том, как важно беречь и защищать его.',
  'Этот кадр запечатлел момент, когда прошлое встречается с настоящим, создавая уникальную и неповторимую атмосферу.',
  'Фотография передает всю глубину и сложность человеческих эмоций, позволяя нам заглянуть в душу человека.',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Александр',
  'Анастасия',
  'Дмитрий',
  'Екатерина',
  'Иван',
  'Мария',
  'Михаил',
  'Наталья',
  'Сергей',
  'Юлия',
];

const QUANTITY = 25;

const ID = {
  min: 1,
  max: 25
};

const PHOTO_ID = {
  min: 1,
  max: 25
};

const ID_COMMENTS = {
  min: 1,
  max: 200
};

const NUMBER_OF_COMMENTS = {
  min: 0,
  max: 30
};

const LIKES = {
  min: 15,
  max: 200
};

const AVATAR = {
  min: 1,
  max: 6
};

const generateId = getRandom(ID.min, ID.max);
const generatePhotoId = getRandom(PHOTO_ID.min, PHOTO_ID.max);
const generateIdComments = getRandom(ID_COMMENTS.min, ID_COMMENTS.max);

const generateGetAccess = (el) => el[getRandomInteger(0, el.length - 1)];

const getComment = function () {
  const array = [];
  for (let i = 0; i < getRandomInteger(NUMBER_OF_COMMENTS.min, NUMBER_OF_COMMENTS.max); i++) {
    array.push({
      id: generateIdComments(),
      avatar: `img/avatar-${getRandomInteger(AVATAR.min, AVATAR.max)}.svg`,
      message: generateGetAccess(MESSAGE),
      name: generateGetAccess(NAME)
    });
  }
  return array;
};

const getObject = () => ({
  id: generateId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: generateGetAccess(DESCRIPTION),
  likes: getRandomInteger(LIKES.min, LIKES.max),
  comments: getComment()
});

const generateData = () => Array.from({ length: QUANTITY }, getObject);

export {generateData};


