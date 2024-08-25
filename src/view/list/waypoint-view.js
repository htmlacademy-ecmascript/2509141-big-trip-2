import dayjs from 'dayjs';
import durationAPI from 'dayjs/plugin/duration';
import AbstractView from '/src/framework/view/abstract-view';
import { humanizeDate } from '/src/util';
import { DateTimeFormat } from '/src/const';


const createOfferTemplate = ({ title, price }) =>
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`;


const formatDuration = (start, end) => {
  dayjs.extend(durationAPI);
  const duration = dayjs.duration(end.diff(start));

  if (duration.days() > 0) {
    return duration.format('DD[D] HH[H] mm[M]');
  }

  if (duration.hours() > 0) {
    return duration.format('HH[H] mm[M]');
  }

  return duration.format('mm[M]');
};


const createWaypointTemplate = (waypoint) => {
  const { type } = waypoint;
  const { name } = waypoint.destination;

  const start = waypoint['date_from'];
  const end = waypoint['date_to'];
  const isFavorite = waypoint['is_favorite'];
  const price = waypoint['base_price'];

  const offers = waypoint.offers;

  const offerElements = offers.map(createOfferTemplate).join('');
  const favoriteClass = isFavorite ? ' event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizeDate(start, DateTimeFormat.DATETIME_DAY)}">${humanizeDate(start, DateTimeFormat.SHORT_DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${humanizeDate(start, DateTimeFormat.DATETIME_FULL)}">${humanizeDate(start, DateTimeFormat.TIME)}</time>
            &mdash;
            <time class="event__end-time" ${humanizeDate(end, DateTimeFormat.DATETIME_FULL)}">${humanizeDate(end, DateTimeFormat.TIME)}</time>
          </p>
          <p class="event__duration">${formatDuration(start, end)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offerElements}
        </ul>
        <button class="event__favorite-btn${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


export default class WaypointView extends AbstractView {
  #waypoint = null;

  constructor({waypoint}) {
    super();
    this.#waypoint = waypoint;
  }

  get template() {
    return createWaypointTemplate(this.#waypoint);
  }
}
