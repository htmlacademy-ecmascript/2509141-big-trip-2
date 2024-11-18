import { render, remove, replace } from '/src/framework/render.js';
import FiltersView from '../view/header/filters-view';
import { FilterType, UpdateType } from '../const';
import filter from '../util/filter';


export default class FilterPresenter {
  #container = null;
  #filterComponent = null;

  #filterModel = null;
  #waypointsModel = null;

  constructor({container, filterModel, waypointsModel}) {
    this.#container = container;

    this.#filterModel = filterModel;
    this.#waypointsModel = waypointsModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.init();
  }

  get filters() {
    const waypoints = this.#waypointsModel.waypoints;

    const isAvailable = (type) => (filter[type](waypoints).length > 0);
    const makeFilterInfo = (type) => ({
      type,
      isAvailable: isAvailable(type)
    });

    return Object.values(FilterType).map(makeFilterInfo);
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters: this.filters,
      currentFilter: this.#filterModel.currentFilter,
      onFilterChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }


  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.currentFilter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
