import getAllDestinations from '../mock/destinations';
import { getRandomArrayElement, getObj } from '../util';


export default class DestinationsModel {
  #destinations = getAllDestinations();

  get destinations() {
    return this.#destinations;
  }

  getDestination(id) {
    return getObj(this.#destinations, 'id', id);
  }

  getRandomDestination = () =>
    getRandomArrayElement(this.#destinations);
}
