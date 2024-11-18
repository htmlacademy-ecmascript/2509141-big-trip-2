import { getObj } from '../util/common';


export default class DestinationsModel {
  #waypointsApiService = null;
  #destinations = [];


  constructor(waypointsApiService) {
    this.#waypointsApiService = waypointsApiService;
  }


  get destinations() {
    return this.#destinations;
  }

  getDestinationByID(id) {
    return getObj(this.#destinations, 'id', id);
  }

  getDestinationByName(name) {
    return getObj(this.#destinations, 'name', name);
  }


  async init() {
    try {
      this.#destinations = await this.#waypointsApiService.destinations;
    } catch(err) {
      throw new Error('You have got nowhere else to go');
    }
  }
}
