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


const updateItem = (items, updated) =>
  items.map((item) => item.id === updated.id ? updated : item);


export {
  createIdGeneratorInRange,
  getObj,
  humanizeDate,
  isEscapeKey,
  hasObjWithId,
  updateItem
};
