import { UpdateType } from '../const';
import { RenderPosition } from '../framework/render';
import { sortByDate } from '../util/sort';
import TripInfoView from '../view/header/trip-info-view';
import FilterPresenter from './filter-presenter';
import { render, remove, replace } from '/src/framework/render';


export default class HeaderPresenter {
  #container = null;
  #tripInfoComponent = null;
  #waypointsModel = null;


  constructor({container, waypointsModel, filterModel}) {
    this.#container = container;

    this.#waypointsModel = waypointsModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);

    this.#createFilterPresenter(filterModel);
  }

  get waypoints() {
    return this.#waypointsModel.waypoints;
  }


  init() {
    if (this.waypoints.length > 0) {
      this.#renderTripInfo();
    } else {
      this.#removeTripInfo();
    }
  }

  #renderTripInfo() {
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      route: this.#getRoute(),
      dates: this.#getDates(),
      totalPrice: this.#getTotalPrice()
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #removeTripInfo() {
    if (this.#tripInfoComponent === null) {
      return;
    }

    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
  }


  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.MINOR:
      case UpdateType.INIT:
        this.init();
    }
  };

  #getRoute() {
    const sortedWaypoints = this.waypoints.toSorted(sortByDate);
    const uniqueDestinations = this.#getDestinations(sortedWaypoints);

    const first = uniqueDestinations.at(0);
    const last = uniqueDestinations.at(-1);

    if (uniqueDestinations.length === 1) {
      return this.waypoints.at(0).destination.name;
    }

    if (uniqueDestinations.length === 2) {
      return `${first} &mdash; ${last}`;
    }

    if (uniqueDestinations.length === 3) {
      const second = uniqueDestinations.at(1);
      return `${first} &mdash; ${second} &mdash; ${last}`;
    }


    return `${first} &mdash; ... &mdash; ${last}`;
  }

  #getDestinations(waypoints) {
    const destinations = waypoints.map((waypoint) => waypoint.destination.name);
    const uniqueDestinations = [...new Set(destinations)];

    const lastDestination = waypoints.at(-1).destination.name;
    if (uniqueDestinations.at(-1) !== lastDestination) {
      uniqueDestinations.push(lastDestination);
    }

    return uniqueDestinations;
  }


  #getTotalPrice() {
    const initialValue = 0;

    return this.waypoints.reduce(this.#reducePrice, initialValue);
  }

  #reducePrice(initialValue, waypoint) {
    initialValue += waypoint.price;

    return waypoint.offers.reduce(
      (totalPrice, offer) => totalPrice + offer.price,
      initialValue
    );
  }


  #getDates() {
    const sortedWaypoints = this.waypoints.toSorted(sortByDate);

    const firstDate = sortedWaypoints.at(0).dateFrom;
    let firstShortDate = this.#formatDate(firstDate);

    const lastDate = sortedWaypoints.at(-1).dateTo;
    const lastShortDate = this.#formatDate(lastDate);


    if (firstShortDate === lastShortDate) {
      return firstShortDate;
    }

    const isSameMonth = firstDate.getMonth() === lastDate.getMonth();
    if (isSameMonth) {
      firstShortDate = firstShortDate.split(' ')[0];
    }

    return `${firstShortDate}&nbsp;&mdash;&nbsp;${lastShortDate}`;
  }

  #formatDate(date) {
    const options = { day: '2-digit', month: 'short'};
    return date.toLocaleDateString('en-GB', options);
  }


  #createFilterPresenter(filterModel) {
    const siteFiltersElement = document.querySelector('.trip-controls__filters');

    new FilterPresenter({
      container: siteFiltersElement,
      waypointsModel: this.#waypointsModel,
      filterModel
    });
  }
}
