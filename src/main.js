import EventsPresenter from './presenter/events-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import WaypointsModel from './model/waypoints-model.js';
import OffersModel from './model/offers-model.js';


const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const waypointsModel = new WaypointsModel(offersModel, destinationsModel);

const siteHeaderElement = document.querySelector('.trip-main');
const headerPresenter = new HeaderPresenter({
  container: siteHeaderElement,
  waypointsModel
});
headerPresenter.init();

const siteEventsSection = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({
  container: siteEventsSection,
  waypointsModel,
  offersModel,
  destinationsModel
});
eventsPresenter.init();
