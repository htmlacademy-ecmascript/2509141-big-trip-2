import EventsPresenter from './presenter/events-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import WaypointsModel from './model/waypoints-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import WaypointsApiService from './waypoints-api-service.js';
import HeaderPresenter from './presenter/header-presenter.js';
import NewWaypointButtonPresenter from './presenter/new-waypoint-button-presenter.js';
import { END_POINT, AUTHORIZATION } from './const.js';


const waypointsApiService = new WaypointsApiService(END_POINT, AUTHORIZATION);
const filterModel = new FilterModel();
const offersModel = new OffersModel(waypointsApiService);
const destinationsModel = new DestinationsModel(waypointsApiService);
const waypointsModel = new WaypointsModel(waypointsApiService, offersModel, destinationsModel);


const siteHeaderElement = document.querySelector('.trip-main');
new HeaderPresenter({
  container: siteHeaderElement,
  waypointsModel,
  filterModel
});

const newWaypointButtonPresenter = new NewWaypointButtonPresenter({
  container: siteHeaderElement,
  onClick: handleNewWaypointButtonClick
});


const siteEventsElement = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({
  container: siteEventsElement,
  destinationsModel,
  waypointsModel,
  filterModel,
  offersModel,
  onNewWaypointFormClose: newWaypointButtonPresenter.enable,
});
eventsPresenter.init();


function handleNewWaypointButtonClick() {
  eventsPresenter.createWaypoint();
}


waypointsModel.init()
  .then(
    newWaypointButtonPresenter.enable,
    () => {}
  );
