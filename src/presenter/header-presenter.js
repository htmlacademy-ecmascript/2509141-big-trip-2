import { render } from '/src/framework/render.js';
import FiltersView from '../view/header/filters-view';


export default class HeaderPresenter {
  #container = null;
  #siteFiltersContainer = null;

  #eventsPresenter = null;

  #waypointsModel = null;

  constructor({container, waypointsModel, eventsPresenter}) {
    this.#container = container;
    this.#siteFiltersContainer = this.#container.querySelector('.trip-controls__filters');

    this.#eventsPresenter = eventsPresenter;

    this.#waypointsModel = waypointsModel;
  }

  init() {
    render(new FiltersView(this.#waypointsModel.availableFilters, this.#onFilterClick), this.#siteFiltersContainer);
  }

  #onFilterClick = (filter) => {
    this.#eventsPresenter.updateFilter(filter);
  };
}
