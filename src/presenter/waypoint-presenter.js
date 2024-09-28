import { render, replace, remove } from '/src/framework/render.js';
import { isEscapeKey } from '../util/util.js';
import EditView from '../view/edit/edit-view.js';
import WaypointView from '../view/list/waypoint-view';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class WaypointPresenter {
  #waypoint = null;

  #offersModel = null;
  #destinationsModel = null;

  #container = null;
  #waypointComponent = null;
  #editFormComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;


  constructor({container, offersModel, destinationsModel, onDataChange, onModeChange}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }


  init(waypoint) {
    this.#waypoint = waypoint;

    this.#render();
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#editFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceToWaypoint();
    }
  }


  #render() {
    const prevWaypointComponent = this.#waypointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#setWaypointComponent();
    this.#setEditFormComponent();

    const isFirstRender = (prevWaypointComponent === null) || (prevEditFormComponent === null);
    if (isFirstRender) {
      render(this.#waypointComponent, this.#container);
      return;
    }

    this.#renderWaypointComponent(prevWaypointComponent);
    this.#renderEditFormComponent(prevEditFormComponent);
  }


  #setWaypointComponent() {
    this.#waypointComponent = new WaypointView({
      waypoint: this.#waypoint,
      onEditClick: () => this.#replaceToForm(),
      onFavoriteClick: this.#handleFavoriteClick
    });
  }

  #setEditFormComponent() {
    this.#editFormComponent = new EditView({
      waypoint: this.#waypoint,
      allTypeOffers: this.#offersModel.getOffers(this.#waypoint.type),
      destinations: this.#destinationsModel.destinations,
      onEditClick: () => this.#replaceToWaypoint(),
      onEventTypeChange: this.#handleEventTypeChange,
      onDestinationChange: this.#handleDestinationChange
    });
  }


  #renderWaypointComponent(prevWaypointComponent) {
    this.#renderComponent(Mode.DEFAULT, this.#waypointComponent, prevWaypointComponent);
  }

  #renderEditFormComponent(prevEditFormComponent) {
    this.#renderComponent(Mode.EDITING, this.#editFormComponent, prevEditFormComponent);
  }

  #renderComponent(mode, newComponent, oldComponent) {
    if (this.#mode === mode) {
      replace(newComponent, oldComponent);
    }

    remove(oldComponent);
  }


  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceToWaypoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceToForm() {
    replace(this.#editFormComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceToWaypoint() {
    replace(this.#waypointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#waypoint, 'is_favorite': !this.#waypoint['is_favorite']});
  };

  #handleEditClick = () => {
    this.#replaceToForm();
  };

  #handleFormSubmit = (evt) => {
    evt.preventDefault();

    this.#handleDataChange();
    this.#replaceToWaypoint();
  };

  #handleEventTypeChange = (evt) => {
    const newType = evt.target.innerText;
    const newOffers = this.#offersModel.getOffers(newType);

    return newOffers; // ❓ Возврат значения у обработчиков событий допустим?
  };

  #handleDestinationChange = (evt) => {
    const newDestinationName = evt.target.value;
    const newDestination = this.#destinationsModel.getDestinationByName(newDestinationName);

    return newDestination;
  };
}
