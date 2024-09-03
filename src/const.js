const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const Filters = {
  EVERYTHING: 'Everything',
  PAST: 'Past',
  PRESENT: 'Present',
  FUTURE: 'Future'
};
const DEFAULT_FILTER = Filters.EVERYTHING;

const DateTimeFormat = {
  SHORT_DATE: 'MMM D',
  EDIT: 'YY/MM/DD HH:mm',
  DATETIME_DAY: 'YYYY-MM-DD',
  DATETIME_FULL: 'YYYY-MM-DDTHH:mm',
  TIME: 'HH:mm'
};

const WAYPOINT_COUNT = 4;


export { TYPES, Filters, DEFAULT_FILTER, DateTimeFormat, WAYPOINT_COUNT };
