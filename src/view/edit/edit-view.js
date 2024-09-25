import createEventHeaderTemplate from './template/event-header';
import createEventDetailsTemplate from './template/event-details';
import AbstractStatefulView from '/src/framework/view/abstract-stateful-view';


const createEditTemplate = (waypoint, allTypeOffers, destinations) =>
  `<form class="event event--edit" action="#" method="post">
    ${createEventHeaderTemplate(waypoint, destinations)}
    ${createEventDetailsTemplate(waypoint, allTypeOffers)}
  </form>`;


export default class EditView extends AbstractStatefulView {
  #allTypeOffers = null;
  #handleEditClick = null;
  #handleFormSubmit = null;
  #destinations = [];
  #waypoint = null;

  constructor({waypoint, allTypeOffers, destinations, onEditClick, onFormSubmit}) {
    super();
    this._setState(EditView.parseWaypointToState(waypoint));
    this.#waypoint = waypoint;
    this.#destinations = destinations;
    this.#allTypeOffers = allTypeOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    // return createEditTemplate(this.#waypoint, this.#allTypeOffers, this.#destinations);
    return createEditTemplate(this._state, this.#allTypeOffers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const waypoint = EditView.parseStateToWaypoint(this._state);
    this.#handleFormSubmit(waypoint);
  };


  static parseWaypointToState(waypoint) {
    // return {...waypoint};
    return waypoint;
  }

  static parseStateToWaypoint(state) {
    return {...state};
  }
}
