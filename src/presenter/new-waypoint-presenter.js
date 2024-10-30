import { nanoid } from 'nanoid';
import { isEscapeKey } from '../util/util';
import { DEFAULT_TYPE, Mode, UpdateType, UserAction } from '../const';
import { remove, render, RenderPosition } from '../framework/render';
import EditView from '../view/edit/edit-view';


export default class NewWaypointPresenter {
  #container = null;
  #editFormComponent = null;

  #offersModel = null;
  #destinationsModel = null;

  #handleDataChange = null;
  #handleDestroy = null;
  #handleEventTypeChange = null;
  #handleDestinationChange = null;

  constructor({container, offersModel, destinationsModel, onEventTypeChange, onDestinationChange, onDataChange, onDestroy}) {
    this.#container = container;

    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#handleEventTypeChange = onEventTypeChange;
    this.#handleDestinationChange = onDestinationChange;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#editFormComponent !== null) {
      return;
    }

    this.#editFormComponent = new EditView({
      waypoint: this.#makeBlankWaypoint(),
      allTypeOffers: this.#offersModel.getOffersOfType(DEFAULT_TYPE),
      destinations: this.#destinationsModel.destinations,
      onCloseClick: this.#handleCloseClick,
      onFormSubmit: this.#handleFormSubmit,
      // ❓ Так как EditView используется и для создания новой точки и для редактирования старой,
      // пришлось передать пустую функцию для ненужного обработчика.
      // Хорошо ли это?
      onDeleteClick: () => {},
      onEventTypeChange: this.#handleEventTypeChange,
      onDestinationChange: this.#handleDestinationChange,
      mode: Mode.NEW
    });

    render(this.#editFormComponent, this.#container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editFormComponent);
    this.#editFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }


  #makeBlankWaypoint = () => ({
    'id': nanoid(),
    'type': DEFAULT_TYPE,
    'base_price': 0,
    'is_favorite': false,
    'date_from': new Date(),
    'date_to': new Date(Date.now() + 60000),
    'destination': null,
    'offers': []
  });

  #handleFormSubmit = (waypoint) => {
    this.#handleDataChange(
      UserAction.ADD,
      UpdateType.MINOR,
      {id: nanoid(), ...waypoint}
    );

    this.destroy();
  };

  #handleCloseClick = () =>
    this.destroy();

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
