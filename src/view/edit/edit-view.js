import AbstractView from '/src/framework/view/abstract-view';
import createEventHeaderTemplate from './template/event-header';
import createEventDetailsTemplate from './template/event-details';


// ❓ Перенёс createTemplate функции в отдельные модули. Всё правильно?
const createEditTemplate = (waypoint, allTypeOffers, destinations) =>
  `<form class="event event--edit" action="#" method="post">
    ${createEventHeaderTemplate(waypoint, destinations)}
    ${createEventDetailsTemplate(waypoint, allTypeOffers)}
  </form>`;


export default class EditView extends AbstractView {
  #waypoint = null;
  #allTypeOffers = null;
  #handleEditClick = null;
  #destinations = [];

  constructor({waypoint, allTypeOffers, destinations, onEditClick}) {
    super();
    this.#waypoint = waypoint;
    this.#destinations = destinations;
    this.#allTypeOffers = allTypeOffers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditTemplate(this.#waypoint, this.#allTypeOffers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
  };
}
