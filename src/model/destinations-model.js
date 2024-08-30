import getAllDestinations from '../mock/destinations';
import { getRandomArrayElement, getObj } from '../util';


export default class DestinationsModel {
  #destinations = getAllDestinations();

  getDestination(id) {
    return getObj(this.#destinations, 'id', id);
  }

  getRandomDestination = () =>
    getRandomArrayElement(this.#destinations);
}
