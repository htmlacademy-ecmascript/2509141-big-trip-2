import dayjs from 'dayjs';


const isEscapeKey = (evt) =>
  evt.key === 'Escape';


const createIdGeneratorInRange = (min, max) =>
  () => min <= max ? min++ : null;


const humanizeDate = (date, format) =>
  date ? dayjs(date).format(format) : '';


const getObj = (array, key, value) =>
  array.find((obj) => obj[key] === value);

const hasValueWithKeyInArray = (array, key, value) =>
  !!getObj(array, key, value);

const hasObjWithId = (array, id) =>
  hasValueWithKeyInArray(array, 'id', id);


export {
  createIdGeneratorInRange,
  getObj,
  humanizeDate,
  isEscapeKey,
  hasObjWithId
};
