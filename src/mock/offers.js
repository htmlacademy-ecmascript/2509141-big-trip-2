import { TYPES } from '../const';
import { getObj, getRandomBool, getRandomIntInRange, createIdGeneratorInRange } from '../util';


const mockOffers = [];

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


const getOffers = (type) =>
  getObj(mockOffers, 'type', type.toLowerCase()).offers;

const getRandomOffers = (type) => {
  const offers = [];
  const typeOffers = getOffers(type);

  typeOffers.forEach((offer) => {
    if (getRandomBool()) {
      offers.push(offer);
    }
  });

  return offers;
};

const getOffer = (type, id) => {
  const offers = getOffers(type);
  const offer = getObj(offers, 'id', id);
  return offer;
};

const has = (offers, id) =>
  !!getObj(offers, 'id', id);


const init = () => {
  TYPES.forEach((type) => mockOffers.push(createMockTypeOffers(type)));
};


export { init, getOffers, getOffer, getRandomOffers, has };
