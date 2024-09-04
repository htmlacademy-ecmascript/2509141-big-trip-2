import AbstractView from '/src/framework/view/abstract-view';


const createDisabledTemplate = (isAvailable) =>
  isAvailable ? '' : 'disabled';

const createFiltersTemplate = (availableFilters) =>
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${createDisabledTemplate(availableFilters.future)}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present" ${createDisabledTemplate(availableFilters.present)}>
      <label class="trip-filters__filter-label" for="filter-present">Present</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${createDisabledTemplate(availableFilters.past)}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;


export default class FiltersView extends AbstractView {
  #handleFilterClick = null;
  #availableFilters = null;

  constructor(availableFilters, onFilterClick) {
    super();
    this.#availableFilters = availableFilters;
    this.#handleFilterClick = onFilterClick;

    this.element.addEventListener('click', this.#filterClickHandler);
  }

  get template() {
    return createFiltersTemplate(this.#availableFilters);
  }

  #filterClickHandler = (evt) => {
    if (evt.target instanceof HTMLInputElement) {
      this.#handleFilterClick(evt.target.value);
    }
  };
}
