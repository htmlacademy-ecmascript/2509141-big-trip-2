import AbstractView from '/src/framework/view/abstract-view';
import createEventHeaderTemplate from './template/event-header';
import createEventDetailsTemplate from './template/event-details';


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
