import EventsPresenter from './presenter/events-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import Model from './model/model.js';
import { init as initOffers } from './mock/offers.js';

initOffers();

const model = new Model();

const siteHeaderElement = document.querySelector('.trip-main');
const headerPresenter = new HeaderPresenter({
  container: siteHeaderElement,
  model
});
headerPresenter.init();

const siteEventsSection = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({
  container: siteEventsSection,
  model
});
eventsPresenter.init();
