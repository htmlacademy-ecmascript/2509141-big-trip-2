import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { TYPES } from '../const';
import { getRandomArrayElement, getRandomBool, getRandomIntInRange } from '/src/util/random';


const getRandomTime = () => {
  const randomTimestamp = getRandomIntInRange(0, 200000000); // 2.31 дня
  const res = dayjs().add(randomTimestamp);

  return res.toDate();
};


const getRandomWaypoint = (getRandomOffersOfType, getRandomDestination) => {
  const type = getRandomArrayElement(TYPES);

  return {
    'id': nanoid(),
    'type': type,
    'base_price': getRandomIntInRange(20, 2000),
    'is_favorite': getRandomBool(),
    'date_from': new Date(),
    'date_to': getRandomTime(),
    'destination': getRandomDestination(),
    'offers': getRandomOffersOfType(type)
  };
};


export default getRandomWaypoint;
