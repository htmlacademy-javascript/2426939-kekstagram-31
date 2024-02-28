// Задание 1. Функция принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее
const getLengthString = (string, max) => (string.length <= max);
getLengthString('Проверка', 15);

// Задание 2. Создать функцию которая проверяет, является ли строка палиндромом. Предусмотреть случай, когда в строке встречаются пробелы.
const getPalindrome = (string) => {
  let newString = '';
  string = string.toLowerCase().replaceAll(' ', '');
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString === string;
};

getPalindrome('Лёша на полке клопа нашёл');

//Задание 3. Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:
const getNumber = (string) => {
  let number = '';
  string = string.toString().replaceAll(' ', '');
  for (let i = 0; i < string.length; i++) {
    if (isNaN(string[i])) {
      number += '';
    } else {
      number += parseInt(string[i], 10);
    }
  }
  if (string < 0) {
    number *= 1;
  }
  return (number === '') ? 'NaN' : number;
};

getNumber('1 кефир, 0.5 батона');


/// 4 Задание. Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.Время указывается в виде строки в формате часы: минуты.Для указания часов и минут могут использоваться как две цифры, так и одна.Например, 8 часов 5 минут могут быть указаны по - разному: 08:05, 8: 5, 08: 5 или 8:05.Продолжительность задаётся числом.Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

// Преобразует часы в минуты
const getMinutes = (time) => {
  const start = time.split(':').map((el) => parseInt(el, 10));
  start[0] *= 60;
  const minutes = start.reduce((sum, el) => sum + el, 0);
  return minutes;
};

const getTime = (startHour, endHour, startMeeting,durationMeeting) => {
  const startMinutes = getMinutes(startHour);
  const EndMinutes = getMinutes(endHour);
  const startHourMeeting = getMinutes(startMeeting);
  return (startHourMeeting + durationMeeting <= EndMinutes && startMinutes <= startHourMeeting);
};

getTime('08:05', '17:00', '8:10', 50);
