import { render, RenderPosition } from '../render.js';
import EditView from '../view/edit/edit-view.js';
import EventDetailsView from '../view/edit/details/event-details-view';
import DestinationView from '../view/edit/details/destination-view';
import EventHeaderView from '../view/edit/header/event-header-view';
import EventTypeView from '../view/edit/header/event-type-view';
import ListView from '../view/list/list-view';
import OffersView from '../view/edit/details/offers-view';
import SortView from '../view/list/sort-view';
import WaypointView from '../view/list/waypoint-view';
import PhotosView from '../view/edit/details/event-photos-view';
import DeleteButtonView from '../view/edit/header/delete-button-view';
import RollupButtonView from '../view/edit/header/rollup-button-view';


export default class Presenter {
  list = new ListView();
  editForm = new EditView();
  eventHeader = new EventHeaderView();
  eventDetails = new EventDetailsView();
  eventDestination = new DestinationView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new SortView(), this.container);

    // ❔ Выделил event__section--offers, event__section--destination и event__photos-container
    // в отдельные компоненты, так как их может и не быть.
    // Разбил форму event--edit на компоненты для event__header, event__details и event__type-wrapper,
    // чтобы один компонент не занимал 150 строк и улучшения читабельности.
    // Хорошо ли это?
    render(this.editForm, this.container);

    render(this.eventHeader, this.editForm.getElement(), RenderPosition.AFTERBEGIN);
    render(new EventTypeView(), this.eventHeader.getElement(), RenderPosition.AFTERBEGIN);
    render(new DeleteButtonView(), this.eventHeader.getElement());
    render(new RollupButtonView(), this.eventHeader.getElement());

    render(this.eventDetails, this.editForm.getElement());
    render(new OffersView(), this.eventDetails.getElement());
    render(this.eventDestination, this.eventDetails.getElement());
    render(new PhotosView(), this.eventDestination.getElement());


    render(this.list, this.container);
    render(new WaypointView(), this.list.getElement());
    render(new WaypointView(), this.list.getElement());
    render(new WaypointView(), this.list.getElement());
  }
}
