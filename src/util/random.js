const getRandomFloatInRange = (min, max) =>
  min + Math.random() * (max - min);

// Случайное число < max
const getRandomIntInRange = (min, max) =>
  Math.floor(getRandomFloatInRange(min, max));

const getRandomBool = () =>
  !!getRandomIntInRange(0, 2);

const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];


export {
  getRandomArrayElement,
  getRandomIntInRange,
  getRandomBool
};
