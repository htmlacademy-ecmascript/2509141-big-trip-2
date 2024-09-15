import { render, replace, remove } from '/src/framework/render.js';
import { isEscapeKey } from '../util.js';
import EditView from '../view/edit/edit-view.js';
import WaypointView from '../view/list/waypoint-view';


export default class WaypointPresenter {
  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #container = null;

  #waypoint = null;

  #waypointComponent = null;
  #editFormComponent = null;

  #handleDataChange = null;

  constructor({container, offersModel, destinationsModel, onDataChange}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
  }


  init(waypoint) {
    this.#waypoint = waypoint;

    this.#render();
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#editFormComponent);
  }


  #render() {
    const prevWaypointComponent = this.#waypointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#setWaypointComponent();
    this.#setEditFormComponent();

    if (prevWaypointComponent === null || prevEditFormComponent === null) {
      render(this.#waypointComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevWaypointComponent.element)) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#container.contains(prevEditFormComponent.element)) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevWaypointComponent);
    remove(prevEditFormComponent);
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
      onEditClick: () => this.#replaceToWaypoint()
    });
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
  }

  #replaceToWaypoint() {
    replace(this.#waypointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
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
}
