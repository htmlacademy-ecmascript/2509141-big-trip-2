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

      this.#waypoints = this.#waypoints.map(this.#adaptToClient);
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
      updatedWaypoint = this.#adaptToServer(updatedWaypoint);
      const response = await this.#waypointsApiService.update(updatedWaypoint);
      updatedWaypoint = this.#adaptToClient(response);

      this.#waypoints.splice(index, 1, updatedWaypoint);

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

  #adaptToClient = (waypoint) => {
    const adaptedWaypoint = {
      ...waypoint,
      destination: this.#destinationsModel.getDestinationByID(waypoint.destination),
      offers: this.#offersModel.idsToOffers(waypoint),
      'date_from': new Date(waypoint['date_from']),
      'date_to': new Date(waypoint['date_to'])
    };

    return adaptedWaypoint;
  };

  #adaptToServer(waypoint) {
    const adaptedWaypoint = {
      ...waypoint,
      destination: waypoint.destination.id,
      offers: waypoint.offers.map((offer) => offer.id),
      'date_from': new Date(waypoint['date_from']),
      'date_to': new Date(waypoint['date_to'])
    };

    return adaptedWaypoint;
  }
}
