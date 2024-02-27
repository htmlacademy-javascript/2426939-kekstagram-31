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
