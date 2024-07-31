import { render, RenderPosition } from '../render.js';
import FiltersView from '../view/header/filters-view';
import TripInfoView from '../view/header/trip-info-view';


export default class HeaderPresenter {
  // ❔ Допустимое обращение к document из presenter? Не нарушает архитектуру?
  siteFiltersContainer = document.querySelector('.trip-controls__filters');

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new TripInfoView(), this.container, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.siteFiltersContainer);
  }
}
