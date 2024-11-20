import EventsPresenter from './presenter/events-presenter';
import DestinationsModel from './model/destinations-model';
import WaypointsModel from './model/waypoints-model';
import OffersModel from './model/offers-model';
import FilterModel from './model/filter-model';
import WaypointsApiService from './waypoints-api-service';
import HeaderPresenter from './presenter/header-presenter';
import NewWaypointButtonPresenter from './presenter/new-waypoint-button-presenter';
import { END_POINT, AUTHORIZATION } from './const';


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
  eventsPresenter.openNewWaypointForm();
}


waypointsModel.init()
  .then(
    newWaypointButtonPresenter.enable,
    () => {}
  );
