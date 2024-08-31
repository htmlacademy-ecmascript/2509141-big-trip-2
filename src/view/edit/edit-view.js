import AbstractView from '/src/framework/view/abstract-view';
import { humanizeDate } from '/src/util';
import { TYPES, DateTimeFormat } from '/src/const';


const isChecked = (id, offers, offersModel) =>
  offersModel.hasOfferWithId(offers, id) ? 'checked' : '';


const createOfferTemplate = ({id, title, price}, checkedOffers, offersModel) =>
  `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.split(' ').at(-1)}-${id}" type="checkbox" name="event-offer-${title.split(' ').at(-1)}" ${isChecked(id, checkedOffers, offersModel)}>
    <label class="event__offer-label" for="event-offer-${title.split(' ').at(-1)}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;

const createOffersTemplate = ({type, offers}, offersModel) => {
  const allOffers = offersModel.getOffers(type);

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${allOffers.map((offer) => createOfferTemplate(offer, offers, offersModel)).join('')}
    </div>
  </section>`);
};


const createPhotoTemplate = ({src, description}) =>
  `<img class="event__photo" src="${src}" alt="${description}">`;


const createPhotosTemplate = (pictures) => {
  if (pictures.length === 0) {
    return '';
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(createPhotoTemplate).join('')}
      </div>
    </div>`;
};


const createDestinationTemplate = ({description, pictures}) =>
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createPhotosTemplate(pictures)}
  </section>`;


const createEventDetailsTemplate = (waypoint, offersModel) => {
  const hasOffers = offersModel.getOffers(waypoint.type).length > 0;
  const offersTemplate = hasOffers ? createOffersTemplate(waypoint, offersModel) : '';

  const hasDestination = waypoint.destination;
  const destinationTemplate = hasDestination ? createDestinationTemplate(waypoint.destination) : '';

  return `<section class="event__details">
            ${offersTemplate}
            ${destinationTemplate}
          </section>`;
};

const createOptionTemplate = (name) =>
  `<option value="${name}"></option>`;

const createRollupButtonTemplate = () =>
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;

const createTypeItemTemplate = (id, type) => {
  const lowType = type.toLowerCase();

  return (`<div class="event__type-item">
    <input id="event-type-${lowType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowType}">
    <label class="event__type-label  event__type-label--${lowType}" for="event-type-${lowType}-${id}">${type}</label>
  </div>`);
};

const createEventTypeTemplate = ({id, type}) =>
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${TYPES.map((typeName) => createTypeItemTemplate(id, typeName)).join('')}
      </fieldset>
    </div>
  </div>`;

const createCancelButtonTemplate = () =>
  '<button class="event__reset-btn" type="reset">Cancel</button>';

const createEventHeaderTemplate = (waypoint) => {
  const { id, type, destination, 'base_price': price } = waypoint;

  const start = humanizeDate(waypoint['date_from'], DateTimeFormat.EDIT);
  const end = humanizeDate(waypoint['date_to'], DateTimeFormat.EDIT);

  const name = destination?.name ?? '';

  // ❓ Как правильно составлять список доступных пунктов назначения?
  const options = createOptionTemplate(name);

  return (`
    <header class="event__header">
      ${createEventTypeTemplate(waypoint)}
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
    ${createCancelButtonTemplate()}
    ${createRollupButtonTemplate()}
  </header>`);
};

const createEditTemplate = (waypoint, offersModel) =>
  `<form class="event event--edit" action="#" method="post">
    ${createEventHeaderTemplate(waypoint)}
    ${createEventDetailsTemplate(waypoint, offersModel)}
  </form>`;


export default class EditView extends AbstractView {
  #waypoint = null;
  #offersModel = null;
  #handleEditClick = null;

  constructor({waypoint, offersModel, onEditClick}) {
    super();
    this.#waypoint = waypoint;
    this.#offersModel = offersModel;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditTemplate(this.#waypoint, this.#offersModel);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
  };
}
