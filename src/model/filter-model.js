import Observable from '../framework/observable';
import { DEFAULT_FILTER } from '../const';


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
