import { render, replace, remove } from '/src/framework/render.js';
import { isEscapeKey, isMinor } from '../util/common.js';
import EditView from '../view/edit/edit-view.js';
import WaypointView from '../view/list/waypoint-view';
import { UpdateType, UserAction, Mode } from '../const.js';


export default class WaypointPresenter {
  #waypoint = null;

  #offersModel = null;
  #destinationsModel = null;

  #container = null;
  #waypointComponent = null;
  #editFormComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;
  #handleEventTypeChange = null;
  #handleDestinationChange = null;

  #mode = Mode.DEFAULT;


  constructor({container, offersModel, destinationsModel, onEventTypeChange, onDestinationChange, onDataChange, onModeChange}) {
    this.#container = container;

    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#handleEventTypeChange = onEventTypeChange;
    this.#handleDestinationChange = onDestinationChange;
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

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormComponent.reset(this.#waypoint);
      this.#replaceToWaypoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#waypointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#editFormComponent.shake(resetFormState);
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
      onCloseClick: this.#handleCloseClick,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onEventTypeChange: this.#handleEventTypeChange,
      onDestinationChange: this.#handleDestinationChange
    });
  }


  #renderWaypointComponent(prevWaypointComponent) {
    this.#renderComponent(Mode.DEFAULT, this.#waypointComponent, prevWaypointComponent);
  }

  #renderEditFormComponent(prevEditFormComponent) {
    this.#renderComponent(Mode.EDITING, this.#waypointComponent, prevEditFormComponent);
    this.#mode = Mode.DEFAULT;
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
    const updatedWaypoint = {
      ...this.#waypoint,
      isFavorite: !this.#waypoint.isFavorite
    };

    this.#handleDataChange(
      UserAction.UPDATE,
      UpdateType.PATCH,
      updatedWaypoint
    );
  };

  #handleCloseClick = () => {
    this.resetView();
  };

  #handleDeleteClick = (waypoint) =>
    this.#handleDataChange(
      UserAction.DELETE,
      UpdateType.MINOR,
      waypoint
    );

  #handleFormSubmit = (updatedWaypoint) => {
    const updateType = isMinor(this.#waypoint, updatedWaypoint)
      ? UpdateType.MINOR
      : UpdateType.PATCH;

    this.#handleDataChange(
      UserAction.UPDATE,
      updateType,
      updatedWaypoint
    );
  };
}
