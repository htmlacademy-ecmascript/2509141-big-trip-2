import AbstractStatefulView from '/src/framework/view/abstract-stateful-view';
import createEventDetailsTemplate from './template/event-details';
import createEventHeaderTemplate from './template/event-header';
import { getObj, isValidDateInterval } from '/src/util/util';
import { Mode } from '/src/const';
import flatpickr from 'flatpickr';
import '/node_modules/flatpickr/dist/flatpickr.min.css';


const createEditTemplate = (waypoint, allTypeOffers, destinations, mode) =>
  `<form class="event event--edit" action="#" method="post">
    ${createEventHeaderTemplate(waypoint, destinations, mode)}
    ${createEventDetailsTemplate(waypoint, allTypeOffers)}
  </form>`;


export default class EditView extends AbstractStatefulView {
  #allTypeOffers = null;
  #handleCloseClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleEventTypeChange = null;
  #handleDestinationChange = null;
  #destinations = [];

  #datepickerFrom = null;
  #datepickerTo = null;

  #mode = Mode.EDITING;

  constructor({waypoint, allTypeOffers, destinations, onCloseClick, onFormSubmit, onDeleteClick, onEventTypeChange, onDestinationChange, mode = Mode.EDITING}) {
    super();
    this._setState(EditView.parseWaypointToState(waypoint, allTypeOffers));
    this.#destinations = destinations;
    this.#allTypeOffers = allTypeOffers;
    this.#handleCloseClick = onCloseClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleEventTypeChange = onEventTypeChange;
    this.#handleDestinationChange = onDestinationChange;

    this.#mode = mode;

    this._restoreHandlers();
  }

  get template() {
    return createEditTemplate(this._state, this.#allTypeOffers, this.#destinations, this.#mode);
  }

  reset(waypoint) {
    const initialState = EditView.parseWaypointToState(waypoint, this.#allTypeOffers);
    this.updateElement(initialState);
  }

  removeElement() {
    super.removeElement();
    this.#datepickerFrom.destroy();
    this.#datepickerTo.destroy();
    this.#datepickerFrom = null;
    this.#datepickerTo = null;
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.addEventListener('submit', this.#formSubmitHandler);

    this.#setCloseHandlers();
    this.#setDatepicker();
  }


  #setCloseHandlers = () => {
    if (this.#mode === Mode.NEW) {
      this.element.querySelector('.event__reset-btn')
        .addEventListener('click', this.#closeClickHandler);
      return;
    }

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
  };


  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditView.parseStateToWaypoint(this._state));
  };


  #eventTypeChangeHandler = (evt) =>
    this.#handleEventTypeChange(evt, this, this.updateElement);

  #destinationChangeHandler = (evt) =>
    this.#handleDestinationChange(evt, this, this.updateElement);


  #updatePriceOf = (waypoint) => {
    const newPrice = Number(this.element.querySelector('.event__input--price').value);
    const oldPrice = waypoint.price;

    if (newPrice !== oldPrice) {
      waypoint.price = newPrice;
    }
  };

  #inputToOffer = (input) => {
    const id = input.dataset.id;
    return getObj(this.#allTypeOffers, 'id', id);
  };

  #updateOffersOf(waypoint) {
    let checkedOffers = this.element.querySelectorAll('.event__offer-checkbox');
    checkedOffers = Array.from(checkedOffers);
    checkedOffers = checkedOffers.filter((input) => input.checked);
    checkedOffers = checkedOffers.map(this.#inputToOffer);

    waypoint.offers = checkedOffers;
  }


  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    if (!isValidDateInterval(this._state.dateFrom, this._state.dateTo)) {
      return;
    }

    const waypoint = EditView.parseStateToWaypoint(this._state);
    this.#updatePriceOf(waypoint);
    this.#updateOffersOf(waypoint);

    this.#handleFormSubmit(waypoint);
  };


  #dateFromChangeHandler = ([userDate]) =>
    this.updateElement({dateFrom: userDate});

  #dateToChangeHandler = ([userDate]) =>
    this.updateElement({dateTo: userDate});

  #makeFlatpickr(selector, dateKey, cb) {
    selector = this.element.querySelector(`[name="event-${selector}-time"]`);

    const config = {
      dateFormat: 'j/m/y H:i',
      defaultDate: this._state[`${dateKey}`],
      enableTime: true,
      'time_24hr': true,
      onChange: cb
    };

    return flatpickr(selector, config);
  }

  #setDatepicker() {
    this.#datepickerFrom = this.#makeFlatpickr('start', 'dateFrom', this.#dateFromChangeHandler);
    this.#datepickerTo = this.#makeFlatpickr('end', 'dateTo', this.#dateToChangeHandler);
  }


  static parseWaypointToState(waypoint, allTypeOffers) {
    return {
      ...waypoint,
      allTypeOffers,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToWaypoint(state) {
    const waypoint = {...state};

    delete waypoint.allTypeOffers;
    delete waypoint.isDisabled;
    delete waypoint.isDeleting;
    delete waypoint.isSaving;

    return waypoint;
  }
}
