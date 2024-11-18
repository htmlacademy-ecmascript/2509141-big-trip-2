import dayjs from 'dayjs';


const isEscapeKey = (evt) =>
  evt.key === 'Escape' || evt.key === 'Esc';


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
  const destinationChanged = waypoint.destination !== updatedWaypoint.destination;

  return priceChanged || startDayChanged || endDayChanged || destinationChanged;
};


export {
  getObj, hasObjWithId,
  humanizeDate, isValidDateInterval,
  isEscapeKey,
  isMinor
};
