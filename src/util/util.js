import dayjs from 'dayjs';


const isEscapeKey = (evt) =>
  evt.key === 'Escape' || evt.key === 'Esc';


const createIdGeneratorInRange = (min, max) =>
  () => min <= max ? min++ : null;


const humanizeDate = (date, format) =>
  date ? dayjs(date).format(format) : '';


const isValidDateInterval = (dateFrom, dateTo) =>
  dateFrom.getTime() < dateTo.getTime();


const getObj = (array, key, value) =>
  array.find((obj) => obj[key] === value);

const hasValueWithKeyInArray = (array, key, value) =>
  !!getObj(array, key, value);

const hasObjWithId = (array, id) =>
  hasValueWithKeyInArray(array, 'id', id);


const isMinor = (waypoint, updatedWaypoint) => {
  const priceChanged = waypoint.price !== updatedWaypoint.price;
  const startDayChanged = waypoint.dateFrom.getTime() !== updatedWaypoint.dateFrom.getTime();
  const endDayChanged = waypoint.dateTo.getTime() !== updatedWaypoint.dateTo.getTime();

  return priceChanged || startDayChanged || endDayChanged;
};


export {
  createIdGeneratorInRange,
  getObj, hasObjWithId,
  humanizeDate, isValidDateInterval,
  isEscapeKey,
  isMinor
};
