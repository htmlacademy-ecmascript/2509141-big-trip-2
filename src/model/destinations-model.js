import { getElement } from '../util/common';


export default class DestinationsModel {
  #waypointsApiService = null;
  #destinations = [];


  constructor(waypointsApiService) {
    this.#waypointsApiService = waypointsApiService;
  }


  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#waypointsApiService.destinations;
    } catch(err) {
      throw new Error('You have got nowhere else to go');
    }
  }

  getDestinationByID(id) {
    return getElement(this.#destinations, 'id', id);
  }

  getDestinationByName(name) {
    return getElement(this.#destinations, 'name', name);
  }
}
