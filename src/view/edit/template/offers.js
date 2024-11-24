import { hasElementWithId } from '/src/util/common';


const isChecked = (id, checkedOffers) =>
  hasElementWithId(checkedOffers, id) ? 'checked' : '';


const createOfferTemplate = ({id, title, price, isDisabled}, checkedOffers) =>
  `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.split(' ').at(-1)}-${id}" data-id="${id}" type="checkbox" name="event-offer-${title.split(' ').at(-1)}" ${isChecked(id, checkedOffers)} ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="event-offer-${title.split(' ').at(-1)}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;


const createOffersTemplate = (checkedOffers, allTypeOffers) =>
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${allTypeOffers.map((offer) => createOfferTemplate(offer, checkedOffers)).join('')}
    </div>
  </section>`;


export default createOffersTemplate;
