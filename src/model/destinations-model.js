import getAllDestinations from '../mock/destinations';
import { getRandomArrayElement } from '../util/random';
import { getObj } from '../util/util';


export default class DestinationsModel {
  #destinations = getAllDestinations();

  get destinations() {
    return this.#destinations;
  }

  getDestinationByID(id) {
    return getObj(this.#destinations, 'id', id);
  }

  getDestinationByName(name) {
    return getObj(this.#destinations, 'name', name);
  }

  getRandomDestination = () =>
    getRandomArrayElement(this.#destinations);
}
