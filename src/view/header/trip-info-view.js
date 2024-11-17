import AbstractView from '/src/framework/view/abstract-view';


const createTripInfoTemplate = (route, totalPrice) =>
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;


export default class TripInfoView extends AbstractView {
  #route = null;
  #totalPrice = null;

  constructor({route, totalPrice}) {
    super();
    this.#route = route;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createTripInfoTemplate(this.#route, this.#totalPrice);
  }
}
