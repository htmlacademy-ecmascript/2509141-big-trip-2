import Observable from '../framework/observable.js';
import { DEFAULT_FILTER } from '../const.js';


export default class FilterModel extends Observable {
  #currentFilter = DEFAULT_FILTER;

  get currentFilter() {
    return this.#currentFilter;
  }

  setFilter(updateType, filter) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}
