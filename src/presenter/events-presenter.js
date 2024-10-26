import { render, remove } from '/src/framework/render.js';
import { DEFAULT_FILTER, DEFAULT_SORT_TYPE, FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortByDate, sortByDuration, sortByPrice } from '../util/sort.js';
import ListView from '../view/list/list-view';
import SortView from '../view/list/sort-view';
import EmptyView from '../view/list/empty-view.js';
import WaypointPresenter from './waypoint-presenter.js';
import filter from '../util/filter.js';
import NewWaypointPresenter from './new-waypoint-presenter.js';


export default class EventsPresenter {
  #container = null;
  #sortView = null;
  #emptyView = null;
  #listView = new ListView();

  #filterModel = null;
  #offersModel = null;
  #waypointsModel = null;
  #destinationsModel = null;

  #currentFilter = DEFAULT_FILTER;
  #currentSortType = DEFAULT_SORT_TYPE;

  #waypointPresenters = new Map();
  #newWaypointPresenter = null;


  constructor({container, filterModel, waypointsModel, offersModel, destinationsModel, onNewWaypointDestroy}) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#waypointsModel = waypointsModel;
    this.#destinationsModel = destinationsModel;

    this.#newWaypointPresenter = new NewWaypointPresenter({
      container: this.#listView.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDestroy: onNewWaypointDestroy,
      onDataChange: this.#handleViewAction,
      onEventTypeChange: this.#handleEventTypeChange,
      onDestinationChange: this.#handleDestinationChange
    });

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }


  get waypoints() {
    this.#currentFilter = this.#filterModel.currentFilter;
    let waypoints = this.#waypointsModel.waypoints;
    waypoints = filter[this.#currentFilter](waypoints);
    // ❓ Теперь при каждом запросе waypoints (например для проверки количества)
    // происходит копированние массива, сортировка и прочие тяжёлые операции.
    // Хорошо ли это?
    // Может хотя бы выделить отдельную переменную waypointsCount в модели?
    waypoints = this.#getSortedWaypoints([...waypoints]); // Проверить проблемы из-за обязательного копирования

    return waypoints;
  }


  init() {
    this.#renderAll();
  }

  createWaypoint() {
    this.#currentSortType = DEFAULT_SORT_TYPE;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newWaypointPresenter.init();
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
      onModeChange: this.#handleModeChange,
      onEventTypeChange: this.#handleEventTypeChange,
      onDestinationChange: this.#handleDestinationChange
    });

    waypointPresenter.init(waypoint);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  };

  // ❓ {resetSortType = false} = {}
  // Это ещё что?
  #removeAll({resetSortType = false} = {}) {
    this.#clearWaypointList();

    remove(this.#sortView);
    remove(this.#emptyView);

    if (resetSortType) {
      this.#currentSortType = DEFAULT_SORT_TYPE;
    }
  }

  #clearWaypointList() {
    this.#newWaypointPresenter.destroy();
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
    this.#newWaypointPresenter.destroy();
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

  // ❓ Перенёс эти методы из WaypointPresenter сюда, так как они используются также и в NewWaypointPresenter
  // Хорошо ли это?
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
