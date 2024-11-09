import ApiService from './framework/api-service';
import { URL } from './const';


export default class DstinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: URL.DESTINATIONS})
      .then(ApiService.parseResponse);
  }
}
