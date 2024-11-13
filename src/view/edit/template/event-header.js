import he from 'he';
import { humanizeDate } from '/src/util/util';
import { DateTimeFormat, Mode } from '/src/const';
import { createCancelButtonTemplate, createDeleteButtonTemplate, createRollupButtonTemplate } from './buttons';
import createEventTypeTemplate from './event-type';


const createOptionTemplate = ({name}) =>
  `<option value="${name}"></option>`;


const createEventHeaderTemplate = (waypoint, destinations, mode, status) => {
  const { id, type, destination, 'base_price': price } = waypoint;

  const start = humanizeDate(waypoint['date_from'], DateTimeFormat.EDIT);
  const end = humanizeDate(waypoint['date_to'], DateTimeFormat.EDIT);

  const name = destination?.name ?? '';

  const options = destinations.map(createOptionTemplate);

  return (`
    <header class="event__header">
      ${createEventTypeTemplate(waypoint, status)}
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${he.encode(name)}" list="destination-list-${id}" required ${status.isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-${id}">
        ${options}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${start}" ${status.isDisabled ? 'disabled' : ''}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${end}" ${status.isDisabled ? 'disabled' : ''}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="number" min="1" name="event-price" value="${price}" ${status.isDisabled ? 'disabled' : ''}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${status.isDisabled ? 'disabled' : ''}>
      ${status.isSaving ? 'Saving...' : 'Save'}
    </button>
    ${mode === Mode.NEW ? createCancelButtonTemplate(status) : createDeleteButtonTemplate(status)}
    ${mode === Mode.NEW ? '' : createRollupButtonTemplate(status)}
  </header>`);
};


export default createEventHeaderTemplate;
