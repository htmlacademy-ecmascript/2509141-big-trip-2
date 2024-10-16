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
      this.#editFormComponent.reset(this.#waypoint);
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
      allTypeOffers: this.#offersModel.getOffersOfType(this.#waypoint.type),
      destinations: this.#destinationsModel.destinations,
      onEditClick: this.#handleEditClick,
      onFormSubmit: this.#handleFormSubmit,
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
      this.resetView();
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
    this.resetView();
  };

  #handleFormSubmit = (updatedWaypoint) => {
    this.#handleDataChange(updatedWaypoint);
    this.#replaceToWaypoint();
  };

  #handleEventTypeChange = (evt, scope, updateElement) => {
    const newType = evt.target.value;
    const newOffers = this.#offersModel.getOffersOfType(newType);

    const newState = {
      type: newType,
      offers: [],
      allTypeOffers: newOffers
    };

    updateElement.call(scope, newState);
  };

  #handleDestinationChange = (evt, scope, updateElement) => {
    const newDestinationName = evt.target.value;
    const newDestination = this.#destinationsModel.getDestinationByName(newDestinationName);
    const isCorrectDestinationName = !!newDestination;

    if (isCorrectDestinationName) {
      updateElement.call(scope, {destination: newDestination});
    }
  };
}
