import getAllDestinations from '../mock/destinations';
import { getRandomArrayElement } from '../util/random';
import { getObj } from '../util/util';


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
