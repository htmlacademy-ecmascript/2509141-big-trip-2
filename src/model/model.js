import { getRandomWaypoint } from '/src/mock/waypoints';
import { WAYPOINT_COUNT } from '/src/const';

// ❔ Возможно какие-то функции следует перенести в model?
export default class Model {
  waypoints = Array.from({ length: WAYPOINT_COUNT }, getRandomWaypoint);

  getWaypoints() {
    return this.waypoints;
  }
}
