import { createElement } from '/src/render';
import { humanizeDate } from '/src/util';
import { DateTimeFormat } from '/src/const';


const createOptionTemplate = (name) =>
  `<option value="${name}"></option>`;


const createEventHeaderTemplate = (waypoints) => {
  const editedWaypoint = waypoints[0];
  const { id, type } = editedWaypoint;
  const price = editedWaypoint['base_price'];

  const start = humanizeDate(editedWaypoint['date_from'], DateTimeFormat.EDIT);
  const end = humanizeDate(editedWaypoint['date_to'], DateTimeFormat.EDIT);

  const name = editedWaypoint.destination ? editedWaypoint.destination.name : '';

  const options = waypoints.map(({destination}) => createOptionTemplate(destination.name)).join('');

  return (`<header class="event__header">
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
      <datalist id="destination-list-${id}">
        ${options}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${start}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${end}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  </header>`);
};


export default class EventHeaderView {
  constructor(waypoints) {
    this.waypoints = waypoints;
  }

  getTemplate() {
    return createEventHeaderTemplate(this.waypoints);
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
