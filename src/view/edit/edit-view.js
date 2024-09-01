import AbstractView from '/src/framework/view/abstract-view';
import createEventHeaderTemplate from './template/event-header';
import createEventDetailsTemplate from './template/event-details';


const createEditTemplate = (waypoint, allTypeOffers) =>
  `<form class="event event--edit" action="#" method="post">
    ${createEventHeaderTemplate(waypoint)}
    ${createEventDetailsTemplate(waypoint, allTypeOffers)}
  </form>`;


export default class EditView extends AbstractView {
  #waypoint = null;
  #allTypeOffers = null;
  #handleEditClick = null;

  constructor({waypoint, allTypeOffers, onEditClick}) {
    super();
    this.#waypoint = waypoint;
    this.#allTypeOffers = allTypeOffers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditTemplate(this.#waypoint, this.#allTypeOffers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
  };
}
