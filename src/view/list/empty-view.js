import AbstractView from '/src/framework/view/abstract-view';
import { FilterType, DEFAULT_FILTER } from '/src/const';


const getMessage = (filter) => {
  const messages = {
    [FilterType.PAST]: 'There are no past events now',
    [FilterType.PRESENT]: 'There are no present events now',
    [FilterType.FUTURE]: 'There are no future events now',
    [FilterType.EVERYTHING]: 'Click New Event to create your first point'
  };

  return messages[filter] || messages[DEFAULT_FILTER];
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
