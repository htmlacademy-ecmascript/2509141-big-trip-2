import EventsPresenter from './presenter/events-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';


const siteHeaderElement = document.querySelector('.trip-main');
const headerPresenter = new HeaderPresenter({container: siteHeaderElement});
headerPresenter.init();

const siteEventsSection = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({container: siteEventsSection});
eventsPresenter.init();
