import { render, remove } from '/src/framework/render.js';
import { DEFAULT_FILTER } from '../const.js';
import { updateItem } from '../util.js';
import ListView from '../view/list/list-view';
import SortView from '../view/list/sort-view';
import EmptyView from '../view/list/empty-view.js';
import WaypointPresenter from './waypoint-presenter.js';


export default class Presenter {
  #container = null;
  #sortView = null;
  #emptyView = null;
  #listView = new ListView();

  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #waypoints = [];
  #waypointPresenters = new Map();
  #currentFilter = DEFAULT_FILTER;


  constructor({container, waypointsModel, offersModel, destinationsModel}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#waypointsModel = waypointsModel;
    this.#destinationsModel = destinationsModel;
  }


  init() {
    this.#waypoints = [...this.#waypointsModel.waypoints];

    this.#renderAll();
  }


  updateFilter(filter = DEFAULT_FILTER) {
    this.#currentFilter = filter;

    this.#removeAll();
    this.#renderAll();
  }


  #renderAll() {
    if (this.#waypoints.length > 0) {
      this.#renderSortView();
      this.#renderWaypoints();
    } else {
      this.#renderEmptyView(this.#currentFilter);
    }
  }

  #removeAll() {
    remove(this.#sortView);
    remove(this.#listView);
    remove(this.#emptyView);
  }

  #renderEmptyView() {
    this.#emptyView = new EmptyView(this.#currentFilter);
    render(this.#emptyView, this.#container);
  }

  #renderSortView() {
    this.#sortView = new SortView();
    render(this.#sortView, this.#container);
  }

  #renderWaypoints() {
    render(this.#listView, this.#container);
    for (let i = 0; i < this.#waypoints.length; i++) {
      this.#renderWaypoint(this.#waypoints[i]);
    }
  }

  #handleWaypointChange = (updatedWaypoint) => {
    this.#waypoints = updateItem(this.#waypoints, updatedWaypoint);
    this.#waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint);
  };

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      container: this.#listView.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleWaypointChange
    });

    waypointPresenter.init(waypoint);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  #clearWaypointList() {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
  }
}
