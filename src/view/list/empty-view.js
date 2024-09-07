import AbstractView from '/src/framework/view/abstract-view';
import { Filters, DEFAULT_FILTER } from '/src/const';


const getMessage = (filter) => {
  const messages = {
    [Filters.PAST]: 'There are no past events now',
    [Filters.PRESENT]: 'There are no present events now',
    [Filters.FUTURE]: 'There are no future events now',
    [Filters.EVERYTHING]: 'Click New Event to create your first point'
  };

  return messages[filter] || messages[Filters.EVERYTHING];
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
