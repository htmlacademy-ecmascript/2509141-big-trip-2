import dayjs from 'dayjs';


function sortByDate(waypointA, waypointB) {
  return dayjs(waypointA.dateFrom).diff(waypointB.dateFrom);
}

function sortByDuration(waypointA, waypointB) {
  const durationA = dayjs.duration(dayjs(waypointA.dateTo).diff(waypointA.dateFrom)).asMilliseconds();
  const durationB = dayjs.duration(dayjs(waypointB.dateTo).diff(waypointB.dateFrom)).asMilliseconds();

  return durationB - durationA;
}

function sortByPrice(waypointA, waypointB) {
  return waypointB.price - waypointA.price;
}


export {
  sortByDate,
  sortByPrice,
  sortByDuration
};
