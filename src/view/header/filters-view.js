import AbstractView from '/src/framework/view/abstract-view';


const createFilterItemTemplate = (filter, currentFilter) => {
  const type = filter.type;
  const checked = (type === currentFilter) ? 'checked' : '';
  const disabled = filter.isAvailable ? '' : 'disabled';

  return `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${checked} ${disabled}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`;
};

const createFiltersTemplate = (filters, currentFilter) =>
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;


export default class FiltersView extends AbstractView {
  #handleFilterChange = null;
  #filters = null;
  #currentFilter = null;

  constructor({filters, currentFilter, onFilterChange}) {
    super();

    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }


  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterChange(evt.target.value);
  };
}
