import AbstractView from '/src/framework/view/abstract-view';
import { Filter, DEFAULT_FILTER } from '/src/const';


const getMessage = (filter) => {
  const messages = {
    [Filter.PAST]: 'There are no past events now',
    [Filter.PRESENT]: 'There are no present events now',
    [Filter.FUTURE]: 'There are no future events now',
    [Filter.EVERYTHING]: 'Click New Event to create your first point'
  };

  return messages[filter] || messages[Filter.EVERYTHING];
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
