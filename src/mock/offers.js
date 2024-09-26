import { TYPES } from '../const';
import { createIdGeneratorInRange } from '../util/util';
import { getRandomIntInRange } from '../util/random';


const createMockOffer = (generateId, type) => {
  const id = generateId();

  return {
    id,
    title: `${type} offer ${id}`,
    price: getRandomIntInRange(20, 200)
  };
};

const createMockTypeOffers = (type) => {
  const lenght = getRandomIntInRange(0, 7);
  const generateId = createIdGeneratorInRange(0, 100);
  const offers = Array.from({ length: lenght }, () => createMockOffer(generateId, type));

  return {
    type: type.toLowerCase(),
    offers
  };
};


const generateMockOffers = () =>
  TYPES.map(createMockTypeOffers);


export default generateMockOffers;
