import { getElement } from '../util/common';


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
    getElement(this.#offers, 'type', type.toLowerCase()).offers;

  getOfferById(type, id) {
    const offers = this.getOffersOfType(type);
    const offer = getElement(offers, 'id', id);
    return offer;
  }

  getOffersByIds({type, offers: ids}) {
    return ids.map((id) => this.getOfferById(type, id));
  }
}
