import { render, replace } from '/src/framework/render.js';
import { isEscapeKey } from '../util.js';
import EditView from '../view/edit/edit-view.js';
import ListView from '../view/list/list-view';
import SortView from '../view/list/sort-view';
import WaypointView from '../view/list/waypoint-view';


export default class Presenter {
  #list = new ListView();
  #container = null;

  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #waypoints = [];

  constructor({container, waypointsModel, offersModel, destinationsModel}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#waypointsModel = waypointsModel;
    this.#destinationsModel = destinationsModel;
  }


  init() {
    this.#waypoints = [...this.#waypointsModel.waypoints];

    this.#renderSortView();
    this.#renderWaypoints();
  }

  #renderSortView() {
    render(new SortView(), this.#container);
  }

  #renderWaypoints() {
    render(this.#list, this.#container);
    for (let i = 0; i < this.#waypoints.length; i++) {
      this.#renderWaypoint(this.#waypoints[i], this.#offersModel);
    }
  }

  // ❓ Слишком длинный метод со сложной структурой.
  // Возможно, стоит его тоже перенести в другой файл?
  #renderWaypoint(waypoint) {
    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceToWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const waypointComponent = new WaypointView({
      waypoint,
      onEditClick: () => {
        replaceToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editFormComponent = new EditView({
      waypoint,
      allTypeOffers: this.#offersModel.getOffers(waypoint.type),
      destinations: this.#destinationsModel.destinations,
      onEditClick: () => {
        replaceToWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceToForm() {
      replace(editFormComponent, waypointComponent);
    }

    function replaceToWaypoint() {
      replace(waypointComponent, editFormComponent);
    }

    render(
      waypointComponent,
      this.#list.element);
  }
}
