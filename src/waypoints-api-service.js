import ApiService from './framework/api-service';
import { Method, URL } from './const';


export default class WaypointsApiService extends ApiService {
  get destinations() {
    return this._load({url: URL.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: URL.OFFERS})
      .then(ApiService.parseResponse);
  }

  get waypoints() {
    return this._load({url: URL.WAYPOINT})
      .then(ApiService.parseResponse);
  }


  async update(waypoint) {
    const config = {
      url: `${URL.WAYPOINT}/${waypoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(waypoint),
      headers: new Headers({'Content-Type': 'application/json'})
    };

    const response = await this._load(config);
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
