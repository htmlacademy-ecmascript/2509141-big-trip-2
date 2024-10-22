import dayjs from 'dayjs';
import Observable from '../framework/observable';
import getRandomWaypoint from '/src/mock/waypoints';
import { WAYPOINT_COUNT } from '/src/const';


export default class WaypointsModel extends Observable {
  #waypoints = []; // TODO: преобразовать в Set

  constructor(offersModel, destinationsModel) {
    super();

    this.#waypoints = Array.from(
      { length: WAYPOINT_COUNT },
      () => getRandomWaypoint(offersModel.getRandomOffersOfType, destinationsModel.getRandomDestination)
    );
  }

  get waypoints() {
    return this.#waypoints;
  }

  get availableFilters() {
    const past = this.#hasProperWaypoints(this.#isPast);
    const present = this.#hasProperWaypoints(this.#isPresent);
    const future = this.#hasProperWaypoints(this.#isFuture);

    return { past, present, future };
  }


  update(updateType, updatedWaypoint) {
    const isRequiredWaypoint = (waypoint) => (waypoint.id === updatedWaypoint.id);
    const index = this.#waypoints.findIndex(isRequiredWaypoint);

    if (index === -1) {
      throw new Error('Can\'t update unexisting waypoint');
    }

    this.#waypoints = [
      ...this.#waypoints.slice(0, index),
      updatedWaypoint,
      ...this.#waypoints.slice(index + 1)
    ];

    this._notify(updateType, updatedWaypoint);
  }

  add(updateType, newWaypoint) {
    this.#waypoints = [newWaypoint, ...this.#waypoints];

    this._notify(updateType, newWaypoint);
  }

  delete(updateType, deletedWaypoint) {
    const isRequiredWaypoint = (waypoint) => (waypoint.id === deletedWaypoint.id);
    const index = this.#waypoints.findIndex(isRequiredWaypoint);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting waypoint');
    }

    this.#waypoints = [
      ...this.#waypoints.slice(0, index),
      ...this.#waypoints.slice(index + 1)
    ];

    this._notify(updateType);
  }

  #isPast(waypoint) {
    return dayjs().isAfter(waypoint['date_to']);
  }

  #isFuture(waypoint) {
    return dayjs().isBefore(waypoint['date_from']);
  }

  #isPresent(waypoint) {
    const isAfterStart = dayjs().isAfter(waypoint['date_from']);
    const isBeforeEnd = dayjs().isBefore(waypoint['date_to']);

    return isAfterStart && isBeforeEnd;
  }

  #hasProperWaypoints(filter) {
    return this.#waypoints.some(filter);
  }
}
