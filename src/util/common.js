import dayjs from 'dayjs';


const isEscapeKey = (evt) =>
  evt.key === 'Escape' || evt.key === 'Esc';


const humanizeDate = (date, format) =>
  date ? dayjs(date).format(format) : '';

const isValidDateInterval = (dateFrom, dateTo) =>
  dateFrom.getTime() < dateTo.getTime();


const getElement = (collection, key, value) =>
  collection.find((element) => element[key] === value);

const hasElement = (collection, key, value) =>
  !!getElement(collection, key, value);

const hasElementWithId = (collection, id) =>
  hasElement(collection, 'id', id);


const isMinor = (waypoint, updatedWaypoint) => {
  const priceChanged = waypoint.price !== updatedWaypoint.price;
  const startDayChanged = waypoint.dateFrom.getTime() !== updatedWaypoint.dateFrom.getTime();
  const endDayChanged = waypoint.dateTo.getTime() !== updatedWaypoint.dateTo.getTime();
  const destinationChanged = waypoint.destination !== updatedWaypoint.destination;

  return priceChanged || startDayChanged || endDayChanged || destinationChanged;
};


export {
  getElement, hasElementWithId,
  humanizeDate, isValidDateInterval,
  isEscapeKey,
  isMinor
};
