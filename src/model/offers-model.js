import generateMockOffers from '../mock/offers';
import { getRandomBool } from '../util/random';
import { getObj } from '../util/util';


export default class OffersModel {
  #offers = generateMockOffers();

  getOffersOfType = (type) =>
    getObj(this.#offers, 'type', type.toLowerCase()).offers;

  getRandomOffersOfType = (type) => {
    const offers = [];
    const typeOffers = this.getOffersOfType(type);

    typeOffers.forEach((offer) => {
      if (getRandomBool()) {
        offers.push(offer);
      }
    });

    return offers;
  };
}
