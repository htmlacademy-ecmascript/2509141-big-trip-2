import createEventHeaderTemplate from './template/event-header';
import createEventDetailsTemplate from './template/event-details';
import AbstractStatefulView from '/src/framework/view/abstract-stateful-view';
import { getObj } from '/src/util/util';


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
  #handleDestinationChange = null;
  #destinations = [];

  constructor({waypoint, allTypeOffers, destinations, onEditClick, onFormSubmit, onEventTypeChange, onDestinationChange}) {
    super();
    this._setState(EditView.parseWaypointToState(waypoint, allTypeOffers));
    this.#destinations = destinations;
    this.#allTypeOffers = allTypeOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEventTypeChange = onEventTypeChange;
    this.#handleDestinationChange = onDestinationChange;

    this._restoreHandlers();
  }

  get template() {
    return createEditTemplate(this._state, this.#allTypeOffers, this.#destinations);
  }

  reset(waypoint) {
    const initialState = EditView.parseWaypointToState(waypoint, this.#allTypeOffers);
    this.updateElement(initialState);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#eventTypeClickHandler);

    // ❓ ТЗ 1.4 "Выбирается из списка предложенных значений, полученных с сервера. Пользователь не может ввести свой вариант для пункта назначения."
    // Есть более нативный способ запретить ввод?
    this.element.querySelector('.event__input--destination')
      .addEventListener('keypress', (evt) => evt.preventDefault());
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }


  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  // ❓ Функции для поиска нужных offers и destinations принадлежат модели.
  // Из представления нельзя обращаться к модели.
  // Приходится делать это через презентер. Хорошо ли это?
  #eventTypeClickHandler = (evt) => {
    if (evt.target.closest('.event__type-label')) {
      const type = evt.target.innerText;
      const newOffers = this.#handleEventTypeChange(type);
      this.updateElement({type, offers: [], allTypeOffers: newOffers});
    }
  };

  #destinationChangeHandler = (evt) => {
    const newDestination = this.#handleDestinationChange(evt);
    const isCorrectDestinationName = !!newDestination;

    if (isCorrectDestinationName) {
      this.updateElement({destination: newDestination});
    }
  };

  // ❓ Сделал не как в демо с вызовом обработчика на ввод каждого символа и многократным обновлением состояния,
  // а с изменением обновлённого объекта маршрутной точки только при сохранении формы. Разве так не будет лучше?
  #updatePriceOf = (waypoint) => {
    const newPrice = Number(this.element.querySelector('.event__input--price').value);
    const oldPrice = waypoint['base_price'];

    if (newPrice !== oldPrice) {
      waypoint['base_price'] = newPrice;
    }
  };

  #inputToOffer = (input) => {
    const id = Number(input.dataset.id);
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

    const waypoint = EditView.parseStateToWaypoint(this._state);
    this.#updatePriceOf(waypoint);
    this.#updateOffersOf(waypoint);

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
