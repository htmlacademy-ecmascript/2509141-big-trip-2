import { getOffers } from '/src/mock/offers.js';
import { has as hasOfferWithId } from '/src/mock/offers';
import AbstractView from '/src/framework/view/abstract-view';


const isChecked = (id, offers) =>
  hasOfferWithId(offers, id) ? 'checked' : '';


const createOfferTemplate = ({id, title, price}, checkedOffers) =>
  `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.split(' ').at(-1)}-${id}" type="checkbox" name="event-offer-${title.split(' ').at(-1)}" ${isChecked(id, checkedOffers)}>
    <label class="event__offer-label" for="event-offer-${title.split(' ').at(-1)}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;

const createOffersTemplate = ({type, offers}) => {
  const allOffers = getOffers(type);

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${allOffers.map((offer) => createOfferTemplate(offer, offers)).join('')}
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


const createEventDetailsTemplate = (waypoint) => {
  const hasOffers = getOffers(waypoint.type).length > 0;
  const offersTemplate = hasOffers ? createOffersTemplate(waypoint) : '';

  const hasDestination = waypoint.destination;
  const destinationTemplate = hasDestination ? createDestinationTemplate(waypoint.destination) : '';

  return `<section class="event__details">
            ${offersTemplate}
            ${destinationTemplate}
          </section>`;
};


export default class EventDetailsView extends AbstractView {
  #waypoint = null;

  constructor({waypoint}) {
    super();
    this.#waypoint = waypoint;
  }

  get template() {
    return createEventDetailsTemplate(this.#waypoint);
  }
}
