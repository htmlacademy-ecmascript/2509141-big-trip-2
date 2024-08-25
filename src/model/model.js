import { getRandomWaypoint } from '/src/mock/waypoints';
import { WAYPOINT_COUNT } from '/src/const';

export default class Model {
  #waypoints = Array.from({ length: WAYPOINT_COUNT }, getRandomWaypoint);

  get waypoints() {
    return this.#waypoints;
  }
}
