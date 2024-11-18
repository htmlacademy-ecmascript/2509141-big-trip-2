const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DEFAULT_TYPE = 'Flight';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};
const DEFAULT_FILTER = FilterType.EVERYTHING;

const SortType = {
  PRICE: 'price',
  TIME: 'time',
  DAY: 'day'
};
const DEFAULT_SORT_TYPE = SortType.DAY;

const DateTimeFormat = {
  TIME: 'HH:mm',
  SHORT_DATE: 'MMM D',
  EDIT: 'YY/MM/DD HH:mm',
  DATETIME_DAY: 'YYYY-MM-DD',
  DATETIME_FULL: 'YYYY-MM-DDTHH:mm',
};


const UserAction = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  ERROR: 'ERROR',
  INIT: 'INIT'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  NEW: 'NEW'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const URL = {
  DESTINATIONS: 'destinations',
  WAYPOINTS: 'points',
  OFFERS: 'offers'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic eo0w666dd29889b';


export {
  TYPES, DEFAULT_TYPE,
  FilterType, DEFAULT_FILTER,
  SortType, DEFAULT_SORT_TYPE,
  DateTimeFormat,
  UserAction, UpdateType,
  Mode,
  Method, URL,
  TimeLimit,
  END_POINT, AUTHORIZATION
};
