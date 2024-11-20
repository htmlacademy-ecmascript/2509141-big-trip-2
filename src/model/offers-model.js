import { getObj } from '../util/common';


export default class OffersModel {
  #waypointsApiService = null;
  #offers = [];


  constructor(waypointsApiService) {
    this.#waypointsApiService = waypointsApiService;
  }

  async init() {
    try {
      this.#offers = await this.#waypointsApiService.offers;
    } catch(err) {
      this.#offers = [];
    }
  }

  getOffersOfType = (type) =>
    getObj(this.#offers, 'type', type.toLowerCase()).offers;

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
}
