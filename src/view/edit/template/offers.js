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


export default createOffersTemplate;
