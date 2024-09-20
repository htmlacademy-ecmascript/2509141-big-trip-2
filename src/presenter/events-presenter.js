import { render, remove } from '/src/framework/render.js';
import { DEFAULT_FILTER, DEFAULT_SORT_TYPE, SortType } from '../const.js';
import { sortByDate, sortByDuration, sortByPrice } from '../util/sort.js';
import { updateItem } from '../util/util.js';
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

  #currentFilter = DEFAULT_FILTER;
  #currentSortType = DEFAULT_SORT_TYPE;

  #waypoints = [];
  #waypointPresenters = new Map();


  constructor({container, waypointsModel, offersModel, destinationsModel}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#waypointsModel = waypointsModel;
    this.#destinationsModel = destinationsModel;
  }


  init() {
    this.#waypoints = [...this.#waypointsModel.waypoints];


    // TEMP: для тестирования сортировки по дате
    let od = this.#waypoints[1]['date_from'];
    this.#waypoints[1]['date_from'] = od.subtract(1, 'day');
    od = this.#waypoints[2]['date_from'];
    this.#waypoints[2]['date_from'] = od.subtract(2, 'day');


    this.#sort(DEFAULT_SORT_TYPE);
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

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#sort(sortType);
      this.#clearWaypointList();
      this.#renderWaypoints();
    }
  };

  #sort(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#waypoints.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#waypoints.sort(sortByDuration);
        break;
      default:
        this.#waypoints.sort(sortByDate);
        break;
    }

    this.#currentSortType = sortType;
  }

  #renderSortView() {
    this.#sortView = new SortView({onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortView, this.#container);
  }

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      container: this.#listView.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleWaypointChange,
      onModeChange: this.#handleModeChange
    });

    waypointPresenter.init(waypoint);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  #clearWaypointList() {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
  }
}
