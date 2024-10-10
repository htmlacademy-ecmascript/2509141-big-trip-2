import { hasObjWithId } from '/src/util/util';


const isChecked = (id, checkedOffers) =>
  hasObjWithId(checkedOffers, id) ? 'checked' : '';


const createOfferTemplate = ({id, title, price}, checkedOffers) =>
  `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.split(' ').at(-1)}-${id}" data-id="${id}" type="checkbox" name="event-offer-${title.split(' ').at(-1)}" ${isChecked(id, checkedOffers)}>
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
