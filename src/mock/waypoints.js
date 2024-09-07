import dayjs from 'dayjs';
import { TYPES } from '../const';
import { getRandomArrayElement, getRandomBool, getRandomIntInRange } from '../util';


const getRandomTime = () => {
  const randomTimestamp = getRandomIntInRange(0, 200000000); // 2.31 дня
  const res = dayjs().add(randomTimestamp);

  return res;
};


const getRandomWaypoint = (getRandomOffers, getRandomDestination) => {
  const type = getRandomArrayElement(TYPES);

  return {
    'id': getRandomIntInRange(0, 10),
    'type': type,
    'base_price': getRandomIntInRange(20, 2000),
    'is_favorite': getRandomBool(),
    'date_from': dayjs(),
    'date_to': getRandomTime(),
    'destination': getRandomDestination(),
    'offers': getRandomOffers(type)
  };
};


export default getRandomWaypoint;
