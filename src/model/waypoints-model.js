import { getRandomWaypoint } from '/src/mock/waypoints';
import { WAYPOINT_COUNT } from '/src/const';

export default class WaypointsModel {
  #waypoints = null;

  constructor(offersModel, destinationsModel) {
    this.#waypoints = Array.from(
      { length: WAYPOINT_COUNT },
      () => getRandomWaypoint(offersModel.getRandomOffers, destinationsModel.getRandomDestination)
    );
  }

  get waypoints() {
    return this.#waypoints;
  }
}
