const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function checkIds(idsSet, num) {
  let id;
  do {
    id = getRandomInteger(1, num);
  } while (idsSet.has(id));

  idsSet.add(id);
  return id;
}

export {checkIds, getRandomArrayElement, getRandomInteger};
