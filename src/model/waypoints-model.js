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
      // ❓ Реализовал вывод ошибки связи с сервером через введение ещё одного типа обновления. Хорошо ли это?
      this._notify(UpdateType.ERROR);
      return;
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


  async add(updateType, newWaypoint) {
    try {
      newWaypoint = this.#adaptToServer(newWaypoint);
      const response = await this.#waypointsApiService.add(newWaypoint);
      newWaypoint = this.#adaptToClient(response);

      this.#waypoints.unshift(newWaypoint);

      this._notify(updateType, newWaypoint);
    } catch(err) {
      throw new Error('Can\'t add waypoint');
    }
  }

  async delete(updateType, deletedWaypoint) {
    const isRequiredWaypoint = (waypoint) => (waypoint.id === deletedWaypoint.id);
    const index = this.#waypoints.findIndex(isRequiredWaypoint);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting waypoint');
    }

    try {
      await this.#waypointsApiService.delete(deletedWaypoint);

      this.#waypoints.splice(index, 1);

      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete waypoint');
    }

  }


  #adaptToClient = (waypoint) => {
    const adaptedWaypoint = {
      ...waypoint,
      destination: this.#destinationsModel.getDestinationByID(waypoint.destination),
      offers: this.#offersModel.idsToOffers(waypoint),
      dateFrom: new Date(waypoint['date_from']),
      dateTo: new Date(waypoint['date_to']),
      isFavorite: waypoint['is_favorite'],
      price: waypoint['base_price']
    };

    return adaptedWaypoint;
  };

  #adaptToServer(waypoint) {
    const adaptedWaypoint = {
      ...waypoint,
      type: waypoint.type,
      destination: waypoint.destination.id,
      offers: waypoint.offers.map((offer) => offer.id),
      'date_from': new Date(waypoint.dateFrom),
      'date_to': new Date(waypoint.dateTo),
      'is_favorite': waypoint.isFavorite,
      'base_price': waypoint.price
    };

    delete adaptedWaypoint.dateFrom;
    delete adaptedWaypoint.dateTo;
    delete adaptedWaypoint.isFavorite;
    delete adaptedWaypoint.price;

    return adaptedWaypoint;
  }
}
