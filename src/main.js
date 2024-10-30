import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import WaypointsModel from './model/waypoints-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import NewWaypointButtonView from './view/header/new-waypoint-button-view.js';
import { render } from './framework/render.js';


const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const waypointsModel = new WaypointsModel(offersModel, destinationsModel);


const siteEventsElement = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({
  container: siteEventsElement,
  destinationsModel,
  waypointsModel,
  filterModel,
  offersModel,
  onNewWaypointDestroy: handleNewWaypointFormClose
});
eventsPresenter.init();


const siteFiltersElement = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter({
  container: siteFiltersElement,
  waypointsModel,
  filterModel
});
filterPresenter.init();


const newWaypointComponent = new NewWaypointButtonView({onClick: handleNewWaypointButtonClick});

function handleNewWaypointFormClose() {
  newWaypointComponent.element.disabled = false;
}

function handleNewWaypointButtonClick() {
  eventsPresenter.createWaypoint();
  newWaypointComponent.element.disabled = true;
}

const siteHeaderElement = document.querySelector('.trip-main');
render(newWaypointComponent, siteHeaderElement);
