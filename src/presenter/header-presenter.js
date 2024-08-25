import { render, RenderPosition } from '/src/framework/render.js';
import FiltersView from '../view/header/filters-view';
import TripInfoView from '../view/header/trip-info-view';


export default class HeaderPresenter {
  #container = null;
  #siteFiltersContainer = null;

  constructor({container}) {
    this.#container = container;
    this.#siteFiltersContainer = this.#container.querySelector('.trip-controls__filters');
  }

  init() {
    render(new TripInfoView(), this.#container, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.#siteFiltersContainer);
  }
}
