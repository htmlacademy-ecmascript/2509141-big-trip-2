import dayjs from 'dayjs';


function sortByDate(a, b) {
  return dayjs(b.dateFrom).diff(a.dateFrom);
}

function sortByDuration(a, b) {
  const durA = dayjs.duration(dayjs(a.dateTo).diff(a.dateFrom)).asMilliseconds();
  const durB = dayjs.duration(dayjs(b.dateTo).diff(b.dateFrom)).asMilliseconds();

  return durB - durA;
}

function sortByPrice(a, b) {
  return b.price - a.price;
}

export {
  sortByDate,
  sortByPrice,
  sortByDuration
};
