import { UpdateType } from '../const';
import { RenderPosition } from '../framework/render';
import { sortByDate } from '../util/sort';
import TripInfoView from '../view/header/trip-info-view';
import { render, remove, replace } from '/src/framework/render.js';


export default class HeaderPresenter {
  #container = null;
  #tripInfoComponent = null;
  #waypointsModel = null;


  constructor({container, waypointsModel}) {
    this.#container = container;
    this.#waypointsModel = waypointsModel;


    this.#waypointsModel.addObserver(this.#handleModelEvent);

  }

  get waypoints() {
    return this.#waypointsModel.waypoints;
  }


  init() {
    if (this.waypoints.length > 0) {
      this.#renderTripInfo();
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


  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.init();
    }
  };

  #getRoute() {
    if (this.waypoints.length === 1) {
      return this.waypoints.at(0).destination.name;
    }


    const sortedWaypoints = this.waypoints.toSorted(sortByDate);
    const destinations = this.#getDestinations(sortedWaypoints);

    const first = destinations.at(0);
    const last = destinations.at(-1);

    if (destinations.length === 2) {
      return `${first} &mdash; ${last}`;
    }

    if (destinations.length === 3) {
      const second = destinations.at(1);
      return `${first} &mdash; ${second} &mdash; ${last}`;
    }


    return `${first} &mdash; ... &mdash; ${last}`;
  }

  #getDestinations(waypoints) {
    const destinations = waypoints.map((waypoint) => waypoint.destination.name);
    const uniqueDestinations = [...new Set(destinations)];

    return uniqueDestinations;
  }


  #getTotalPrice() {
    const initialValue = 0;
    return this.waypoints.reduce(
      (totalPrice, waypoint) => totalPrice + waypoint.price,
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
    return date.toLocaleDateString('en', options);
  }
}
