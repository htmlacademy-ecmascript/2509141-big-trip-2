import dayjs from 'dayjs';
import getRandomWaypoint from '/src/mock/waypoints';
import { WAYPOINT_COUNT } from '/src/const';


export default class WaypointsModel {
  #waypoints = [];

  constructor(offersModel, destinationsModel) {
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

    return { past, present, future};
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
