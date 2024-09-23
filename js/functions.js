function checkLength (string, maxLength) {
  return string.length <= maxLength;
}

//tests
// console.log(checkLength('проверяемая строка', 20));
// console.log(checkLength('проверяемая строка', 18));
// console.log(checkLength('проверяемая строка', 10));
checkLength('проверяемая строка', 20);


function isPalindrome (string) {
  string = string.replaceAll(' ', '').toLowerCase();
  const normalizedString = string;
  let reversedString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += normalizedString.at(i);
  }

  return reversedString === string;
}

//tests
// console.log(isPalindrome('топот'));
// console.log(isPalindrome('ДовОд'));
// console.log(isPalindrome('Кекс'));
// console.log(isPalindrome('Лёша на полке клопа нашёл '));
isPalindrome('топот');


function findNumbers (string) {
  string = String(string); // если на вход подаётся number
  let number = '';

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string.at(i), 10))) {
      number += string.at(i);
    }
  }

  return number === '' ? NaN : Number(number);
}

// tests
// console.log(findNumbers('2023 год'));
// console.log(findNumbers('ECMAScript 2022'));
// console.log(findNumbers('1 кефир, 0.5 батона'));
// console.log(findNumbers('агент 007'));
// console.log(findNumbers('а я томат'));
// console.log(findNumbers(2023));
// console.log(findNumbers(-1));
// console.log(findNumbers(1.5));
findNumbers('2023 год');
