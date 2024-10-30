import dayjs from 'dayjs';


const isEscapeKey = (evt) =>
  evt.key === 'Escape' || evt.key === 'Esc';


const createIdGeneratorInRange = (min, max) =>
  () => min <= max ? min++ : null;


const humanizeDate = (date, format) =>
  date ? dayjs(date).format(format) : '';

// ❓ Как в этом проекте предполагается настраивать валидацию?
// Пока хватает встроенных ограничений HTML и проверки даты в момент сохранения.
// Хорошо ли это? В предыдущем проекте для валидации использовался pristine.
// Стоит ли и здесь им воспользоваться? Или это будет избыточно?
const isValidDateInterval = (dateFrom, dateTo) =>
  dateFrom.getTime() < dateTo.getTime();


const getObj = (array, key, value) =>
  array.find((obj) => obj[key] === value);

const hasValueWithKeyInArray = (array, key, value) =>
  !!getObj(array, key, value);

const hasObjWithId = (array, id) =>
  hasValueWithKeyInArray(array, 'id', id);


const isMinor = (waypoint, updatedWaypoint) => {
  const priceChanged = waypoint['base_price'] !== updatedWaypoint['base_price'];
  const startDayChanged = waypoint['date_from'].getTime() !== updatedWaypoint['date_from'].getTime();
  const endDayChanged = waypoint['date_to'].getTime() !== updatedWaypoint['date_to'].getTime();

  return priceChanged || startDayChanged || endDayChanged;
};


export {
  createIdGeneratorInRange,
  getObj, hasObjWithId,
  humanizeDate, isValidDateInterval,
  isEscapeKey,
  isMinor
};
