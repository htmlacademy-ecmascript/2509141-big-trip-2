import dayjs from 'dayjs';


function sortByDate(a, b) {
  return b['date_from'].diff(a['date_from']);
}

function sortByDuration(a, b) {
  const durA = dayjs.duration(a['date_to'].diff(a['date_from'])).asMilliseconds();
  const durB = dayjs.duration(b['date_to'].diff(b['date_from'])).asMilliseconds();

  return durB - durA;
}

function sortByPrice(a, b) {
  return b['base_price'] - a['base_price'];
}

export {
  sortByDate,
  sortByPrice,
  sortByDuration
};
