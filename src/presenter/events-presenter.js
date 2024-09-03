import { render, replace, remove } from '/src/framework/render.js';
import { isEscapeKey } from '../util.js';
import EditView from '../view/edit/edit-view.js';
import ListView from '../view/list/list-view';
import SortView from '../view/list/sort-view';
import WaypointView from '../view/list/waypoint-view';
import EmptyView from '../view/list/empty-view.js';
import { DEFAULT_FILTER } from '../const.js';


export default class Presenter {
  #container = null;
  #sortView = null;
  #emptyView = null;
  #listView = new ListView();

  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #waypoints = [];
  #currentFilter = DEFAULT_FILTER;

  constructor({container, waypointsModel, offersModel, destinationsModel}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#waypointsModel = waypointsModel;
    this.#destinationsModel = destinationsModel;
  }


  init() {
    // this.#waypoints = [...this.#waypointsModel.waypoints];

    this.#renderAll();
  }

  updateFilter(filter = DEFAULT_FILTER) {
    this.#removeAll();
    this.#renderAll(filter);
  }

  #renderAll(filter = DEFAULT_FILTER) {
    if (this.#waypoints.length > 0) {
      this.#renderSortView();
      this.#renderWaypoints();
    } else {
      this.#renderEmptyView(filter);
    }
  }

  #removeAll() {
    remove(this.#sortView);
    remove(this.#listView);
    remove(this.#emptyView);
  }

  #renderEmptyView(filter = DEFAULT_FILTER) {
    this.#emptyView = new EmptyView(filter);
    render(this.#emptyView, this.#container);
  }

  #renderSortView() {
    this.#sortView = new SortView();
    render(this.#sortView, this.#container);
  }

  #renderWaypoints() {
    render(this.#listView, this.#container);
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
      this.#listView.element);
  }
}
