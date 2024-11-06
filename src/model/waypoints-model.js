import Observable from '../framework/observable';
import getRandomWaypoint from '/src/mock/waypoints';
import { WAYPOINT_COUNT } from '/src/const';


export default class WaypointsModel extends Observable {
  #waypoints = [];


  constructor(offersModel, destinationsModel) {
    super();

    this.#waypoints = Array.from(
      { length: WAYPOINT_COUNT },
      () => getRandomWaypoint(offersModel.getRandomOffersOfType, destinationsModel.getRandomDestination)
    );

    // TEMP: для тестирования сортировки по дате и фильтров
    this.#enableSortFilterTestMode();
  }

  get waypoints() {
    return this.#waypoints;
  }


  update(updateType, updatedWaypoint) {
    const isRequiredWaypoint = (waypoint) => (waypoint.id === updatedWaypoint.id);
    const index = this.#waypoints.findIndex(isRequiredWaypoint);

    if (index === -1) {
      throw new Error('Can\'t update unexisting waypoint');
    }

    this.#waypoints.splice(index, 1, updatedWaypoint);

    this._notify(updateType, updatedWaypoint);
  }

  add(updateType, newWaypoint) {
    this.#waypoints.unshift(newWaypoint);

    this._notify(updateType, newWaypoint);
  }

  delete(updateType, deletedWaypoint) {
    const isRequiredWaypoint = (waypoint) => (waypoint.id === deletedWaypoint.id);
    const index = this.#waypoints.findIndex(isRequiredWaypoint);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting waypoint');
    }

    this.#waypoints.splice(index, 1);

    this._notify(updateType);
  }


  #enableSortFilterTestMode() {
    // FUTURE filter
    let od = this.waypoints[1]['date_from'].getDate();
    this.waypoints[1]['date_from'].setDate(od + 1);
    od = this.waypoints[1]['date_to'].getDate();
    this.waypoints[1]['date_to'].setDate(od + 1);
    // PAST filter
    od = this.waypoints[2]['date_from'].getDate();
    this.waypoints[2]['date_from'].setDate(od - 3);
    od = this.waypoints[2]['date_to'].getDate();
    this.waypoints[2]['date_to'].setDate(od - 3);
  }
}
