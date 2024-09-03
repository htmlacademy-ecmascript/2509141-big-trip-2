import AbstractView from '/src/framework/view/abstract-view';
import { Filters, DEFAULT_FILTER } from '/src/const';


const getMessage = (filter) => {
  switch (filter) {
    case Filters.PAST:
      return 'There are no past events now';
    case Filters.PRESENT:
      return 'There are no present events now';
    case Filters.FUTURE:
      return 'There are no future events now';
    default:
      return 'Click New Event to create your first point';
  }
};

const createEmptyTemplate = (filter) =>
  `<p class="trip-events__msg">${getMessage(filter)}</p>`;


export default class EmptyView extends AbstractView {
  #filter = DEFAULT_FILTER;

  constructor(filter) {
    super();
    this.#filter = filter;
  }


  get template() {
    return createEmptyTemplate(this.#filter);
  }
}
