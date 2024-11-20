import { render, remove } from '/src/framework/render';
import { DEFAULT_FILTER, DEFAULT_SORT_TYPE, FilterType, SortType, UpdateType, UserAction, TimeLimit } from '../const';
import { sortByDate, sortByDuration, sortByPrice } from '../util/sort';
import filter from '../util/filter';
import ListView from '../view/list/list-view';
import NewWaypointPresenter from './new-waypoint-presenter';
import WaypointPresenter from './waypoint-presenter';
import LoadingView from '../view/list/loading-view';
import EmptyView from '../view/list/empty-view';
import ErrorView from '../view/list/error-view';
import SortView from '../view/list/sort-view';
import UiBlocker from '/src/framework/ui-blocker/ui-blocker';


export default class EventsPresenter {
  #container = null;
  #sortComponent = null;
  #emptyListComponent = null;
  #listComponent = new ListView();
  #loadingComponent = new LoadingView();
  #errorComponent = new ErrorView();

  #filterModel = null;
  #offersModel = null;
  #waypointsModel = null;
  #destinationsModel = null;

  #waypointPresenters = new Map();
  #newWaypointPresenter = null;

  #currentFilter = DEFAULT_FILTER;
  #currentSortType = DEFAULT_SORT_TYPE;
  #isNewWaypointFormOpen = false;
  #isLoading = true;

  #handleNewWaypointFormClose = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({container, filterModel, waypointsModel, offersModel, destinationsModel, onNewWaypointFormClose}) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#waypointsModel = waypointsModel;
    this.#destinationsModel = destinationsModel;
    // ❓ Как правильно дополнить обработчик для передачи дальше по цепочке?
    this.#handleNewWaypointFormClose = () => {
      onNewWaypointFormClose();
      this.#closeNewWaypointForm();
    };

    this.#newWaypointPresenter = new NewWaypointPresenter({
      container: this.#listComponent.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDestroy: this.#handleNewWaypointFormClose,
      onDestinationChange: this.#handleDestinationChange,
      onEventTypeChange: this.#handleEventTypeChange,
      onDataChange: this.#handleViewAction,
    });

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }


  get waypoints() {
    this.#currentFilter = this.#filterModel.currentFilter;

    let waypoints = this.#waypointsModel.waypoints;
    waypoints = filter[this.#currentFilter](waypoints);
    waypoints = this.#getSortedWaypoints(waypoints);

    return waypoints;
  }


  init() {
    this.#renderAll();
  }

  createWaypoint() {
    this.#isNewWaypointFormOpen = true;

    this.#currentSortType = DEFAULT_SORT_TYPE;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#newWaypointPresenter.init();

  }

  #closeNewWaypointForm() {
    this.#isNewWaypointFormOpen = false;

    if (this.waypoints.length === 0) {
      remove(this.#sortComponent);
      this.#renderEmptyView(this.#currentFilter);
    }
  }

  #renderAll() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const waypoints = this.waypoints;
    if (waypoints.length > 0 || this.#isNewWaypointFormOpen) {
      this.#renderSortView();
      this.#renderWaypoints(waypoints);
    } else {
      this.#renderEmptyView(this.#currentFilter);
    }
  }

  #renderSortView() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#container);
  }

  #renderEmptyView() {
    this.#emptyListComponent = new EmptyView(this.#currentFilter);
    render(this.#emptyListComponent, this.#container);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #renderWaypoints(waypoints) {
    render(this.#listComponent, this.#container);
    waypoints.forEach(this.#renderWaypoint);
  }

  #renderWaypoint = (waypoint) => {
    const waypointPresenter = new WaypointPresenter({
      container: this.#listComponent.element,
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


  #removeAll({resetSortType = false, closeNewWaypointForm = true} = {}) {
    this.#clearWaypointList();

    if (closeNewWaypointForm) {
      this.#isNewWaypointFormOpen = false;
    }

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = DEFAULT_SORT_TYPE;
    }
  }

  #clearWaypointList() {
    this.#newWaypointPresenter.destroy();
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
  }


  #handleViewAction = async (actionType, updateType, waypoint) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE:
        await this.#update(updateType, waypoint);
        break;
      case UserAction.ADD:
        await this.#add(updateType, waypoint);
        break;
      case UserAction.DELETE:
        await this.#delete(updateType, waypoint);
        break;
    }

    this.#uiBlocker.unblock();
  };

  async #update(updateType, waypoint) {
    this.#waypointPresenters.get(waypoint.id).setSaving();

    try {
      await this.#waypointsModel.update(updateType, waypoint);
    } catch(err) {
      this.#waypointPresenters.get(waypoint.id).setAborting();
    }
  }

  async #add(updateType, waypoint) {
    this.#newWaypointPresenter.setSaving();

    try {
      await this.#waypointsModel.add(updateType, waypoint);
    } catch (err) {
      this.#newWaypointPresenter.setAborting();
    }
  }

  async #delete(updateType, waypoint) {
    this.#waypointPresenters.get(waypoint.id).setDeleting();

    try {
      await this.#waypointsModel.delete(updateType, waypoint);
    } catch (err) {
      this.#waypointPresenters.get(waypoint.id).setAborting();
    }
  }


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
        this.#removeAll({resetSortType: true, closeNewWaypointForm: false});
        this.#renderAll();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderAll();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        render(this.#errorComponent, this.#container);
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
        return waypoints.toSorted(sortByPrice);
      case SortType.TIME:
        return waypoints.toSorted(sortByDuration);
      case SortType.DAY:
        return waypoints.toSorted(sortByDate);
      default:
        return waypoints;
    }
  }


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
