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
  #handleEventTypeChange = null;
  #destinations = [];

  constructor({waypoint, allTypeOffers, destinations, onEditClick, onFormSubmit, onEventTypeChange}) {
    super();
    this._setState(EditView.parseWaypointToState(waypoint, allTypeOffers));
    this.#destinations = destinations;
    this.#allTypeOffers = allTypeOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEventTypeChange = onEventTypeChange;

    this._restoreHandlers();
  }

  get template() {
    return createEditTemplate(this._state, this.#allTypeOffers, this.#destinations);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#eventTypeClickHandler);

    this.element.addEventListener('submit', this.#formSubmitHandler);
  }


  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #eventTypeClickHandler = (evt) => {
    if (evt.target.closest('.event__type-label')) {
      const newOffers = this.#handleEventTypeChange(evt);
      this.updateElement({offers: [], allTypeOffers: newOffers});
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const waypoint = EditView.parseStateToWaypoint(this._state);
    this.#handleFormSubmit(waypoint);
  };


  static parseWaypointToState(waypoint, allTypeOffers) {
    return {...waypoint, allTypeOffers};
  }

  static parseStateToWaypoint(state) {
    const waypoint = {...state};
    delete waypoint.allTypeOffers;

    return waypoint;
  }
}
