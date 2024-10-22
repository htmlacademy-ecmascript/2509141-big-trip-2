import { render, remove } from '/src/framework/render.js';
import { DEFAULT_FILTER, DEFAULT_SORT_TYPE, SortType, UpdateType, UserAction } from '../const.js';
import { sortByDate, sortByDuration, sortByPrice } from '../util/sort.js';
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

  #waypointPresenters = new Map();


  constructor({container, waypointsModel, offersModel, destinationsModel}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#waypointsModel = waypointsModel;
    this.#destinationsModel = destinationsModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
  }


  get waypoints() {
    let waypoints = this.#waypointsModel.waypoints;
    // ❓ Теперь при каждом запросе waypoints (например для проверки количества)
    // происходит копированние массива, сортировка и прочие тяжёлые операции.
    // Хорошо ли это?
    // Может хотя бы выделить отдельную переменную waypointsCount в модели?
    waypoints = this.#getSortedWaypoints([...waypoints]); // Проверить проблемы из-за обязательного копирования

    return waypoints;
  }


  init() {
    // TEMP: для тестирования сортировки по дате
    let od = this.waypoints[1]['date_from'].getDate();
    this.waypoints[1]['date_from'].setDate(od - 1);
    od = this.waypoints[2]['date_from'].getDate();
    this.waypoints[2]['date_from'].setDate(od - 2);


    this.#renderAll();
  }


  updateFilter(filter = DEFAULT_FILTER) {
    this.#currentFilter = filter;

    this.#removeAll();
    this.#renderAll();
  }


  #renderAll() {
    if (this.waypoints.length > 0) {
      this.#renderSortView();
      this.#renderWaypoints();
    } else {
      this.#renderEmptyView(this.#currentFilter);
    }
  }

  #renderSortView() {
    this.#sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortView, this.#container);
  }

  #renderEmptyView() {
    this.#emptyView = new EmptyView(this.#currentFilter);
    render(this.#emptyView, this.#container);
  }

  #renderWaypoints() {
    render(this.#listView, this.#container);
    this.waypoints.forEach(this.#renderWaypoint);
  }

  #renderWaypoint = (waypoint) => {
    const waypointPresenter = new WaypointPresenter({
      container: this.#listView.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    waypointPresenter.init(waypoint);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  };

  // ❓ {resetSortType = false} = {}
  // Это ещё что?
  #removeAll({resetSortType = false} = {}) {
    this.#clearWaypointList();

    remove(this.#sortView);
    remove(this.#listView);
    remove(this.#emptyView);

    if (resetSortType) {
      this.#currentSortType = DEFAULT_SORT_TYPE;
    }
  }

  #clearWaypointList() {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
  }


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE:
        this.#waypointsModel.update(updateType, update);
        break;
      case UserAction.ADD:
        this.#waypointsModel.add(updateType, update);
        break;
      case UserAction.DELETE:
        this.#waypointsModel.delete(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#removeAll();
        this.#renderAll();
        break;
      case UpdateType.MAJOR:
        this.#removeAll({resetSortType: true});
        this.#renderAll();
        break;
    }
  };


  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#removeAll();
      this.#renderAll();
    }
  };

  #getSortedWaypoints(waypoints) {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return waypoints.sort(sortByPrice);
      case SortType.TIME:
        return waypoints.sort(sortByDuration);
      case SortType.DAY:
        return waypoints.sort(sortByDate);
      default:
        return waypoints;
    }
  }
}
