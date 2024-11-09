import Observable from '../framework/observable';
import { UpdateType } from '/src/const';


export default class WaypointsModel extends Observable {
  #waypointsApiService = null;

  #destinationsModel = null;
  #offersModel = null;

  #waypoints = [];


  constructor(waypointsApiService, offersModel, destinationsModel) {
    super();

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#waypointsApiService = waypointsApiService;
  }

  get waypoints() {
    return this.#waypoints;
  }


  async init() {
    try {
      this.#waypoints = await this.#waypointsApiService.waypoints;

      await this.#destinationsModel.init();
      await this.#offersModel.init();

      this.#waypoints.forEach(this.#assembleWaypoint);
    } catch(err) {
      this.#waypoints = [];
    }

    this._notify(UpdateType.INIT);
  }


  async update(updateType, updatedWaypoint) {
    const isRequiredWaypoint = (waypoint) => (waypoint.id === updatedWaypoint.id);
    const index = this.#waypoints.findIndex(isRequiredWaypoint);

    if (index === -1) {
      throw new Error('Can\'t update unexisting waypoint');
    }

    try {
      const response = await this.#waypointsApiService.update(updatedWaypoint);
      this.#waypoints.splice(index, 1, response);
      this._notify(updateType, updatedWaypoint);
    } catch(err) {
      throw new Error('Can\'t update waypoint');
    }


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

  #assembleWaypoint = (waypoint) => {
    waypoint.destination = this.#destinationsModel.getDestinationByID(waypoint.destination);
    waypoint.offers = this.#offersModel.idsToOffers(waypoint);
  };


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
