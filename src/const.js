const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const Filter = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future'
};
const DEFAULT_FILTER = Filter.EVERYTHING;

const SortType = {
  PRICE: 'price',
  TIME: 'time',
  DAY: 'day'
};
const DEFAULT_SORT_TYPE = SortType.DAY;

const DateTimeFormat = {
  SHORT_DATE: 'MMM D',
  EDIT: 'YY/MM/DD HH:mm',
  DATETIME_DAY: 'YYYY-MM-DD',
  DATETIME_FULL: 'YYYY-MM-DDTHH:mm',
  TIME: 'HH:mm'
};

const WAYPOINT_COUNT = 4;


export {
  TYPES,
  Filter, DEFAULT_FILTER,
  SortType, DEFAULT_SORT_TYPE,
  DateTimeFormat,
  WAYPOINT_COUNT
};
