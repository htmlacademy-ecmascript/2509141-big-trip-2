import generateMockOffers from '../mock/offers';
import { getRandomBool } from '../util/random';
import { getObj } from '../util/util';


export default class OffersModel {
  #offers = generateMockOffers();

  getOffers(type) {
    return getObj(this.#offers, 'type', type.toLowerCase()).offers;
  }

  getRandomOffers = (type) => {
    const offers = [];
    const typeOffers = this.getOffers(type);

    typeOffers.forEach((offer) => {
      if (getRandomBool()) {
        offers.push(offer);
      }
    });

    return offers;
  };

  getOffer(type, id) {
    const offers = this.getOffers(type);
    const offer = getObj(offers, 'id', id);

    return offer;
  }
}
