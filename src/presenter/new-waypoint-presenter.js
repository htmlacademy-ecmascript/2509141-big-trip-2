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

  setSaving() {
    this.#editFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    // ❓ Объеденить бы isDisabled, isSaving и isDeleting в один класс с методом resetFormState...
    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormComponent.shake(resetFormState);
  }


  #makeBlankWaypoint = () => ({
    type: DEFAULT_TYPE,
    price: 0,
    isFavorite: false,
    dateFrom: new Date(),
    dateTo: new Date(Date.now() + 60000),
    destination: null,
    offers: []
  });

  #handleFormSubmit = (waypoint) => {
    this.#handleDataChange(
      UserAction.ADD,
      UpdateType.MINOR,
      waypoint
    );
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
