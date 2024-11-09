import { getRandomBool } from '../util/random';
import { getObj } from '../util/util';


export default class OffersModel {
  #waypointsApiService = null;
  #offers = [];


  constructor(waypointsApiService) {
    this.#waypointsApiService = waypointsApiService;
  }


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

  getOfferOfTypeById(type, id) {
    const offers = this.getOffersOfType(type);
    const offer = getObj(offers, 'id', id);
    return offer;
  }

  hasOfferWithId(offers, id) {
    return !!getObj(offers, 'id', id);
  }

  idsToOffers({type, offers: ids}) {
    return ids.map((id) => this.getOfferOfTypeById(type, id));
  }


  async init() {
    try {
      this.#offers = await this.#waypointsApiService.offers;
    } catch(err) {
      this.#offers = [];
    }
  }
}
