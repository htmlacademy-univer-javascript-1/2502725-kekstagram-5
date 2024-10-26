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


function isMeetingInWorkday(startTime, endTime, meetingStart, duration) {
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startTimeInMins = timeToMinutes(startTime);
  const endTimeInMins = timeToMinutes(endTime);
  const meetingStartInMins = timeToMinutes(meetingStart);
  const meetingEndInMins = meetingStartInMins + duration;

  return (meetingStartInMins >= startTimeInMins && meetingEndInMins <= endTimeInMins);
}

isMeetingInWorkday('08:00', '17:30', '14:00', 90);
// tests
// console.log(isMeetingInWorkday('08:00', '17:30', '14:00', 90));
// console.log(isMeetingInWorkday('8:0', '10:0', '8:0', 120));
// console.log(isMeetingInWorkday('08:00', '14:30', '14:00', 90));
// console.log(isMeetingInWorkday('14:00', '17:30', '08:0', 90));
// console.log(isMeetingInWorkday('8:00', '17:30', '08:00', 900));


