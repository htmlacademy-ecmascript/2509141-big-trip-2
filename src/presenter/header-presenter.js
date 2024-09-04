import { render, RenderPosition } from '/src/framework/render.js';
import FiltersView from '../view/header/filters-view';
import TripInfoView from '../view/header/trip-info-view';


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
    render(new TripInfoView(), this.#container, RenderPosition.AFTERBEGIN);

    render(new FiltersView(this.#waypointsModel.availableFilters, this.#onFilterClick), this.#siteFiltersContainer);
  }

  #onFilterClick = (filter) => {
    this.#eventsPresenter.updateFilter(filter);
  };
}
