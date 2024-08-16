import { render, RenderPosition } from '../render.js';
import EditView from '../view/edit/edit-view.js';
import EventDetailsView from '../view/edit/details/event-details-view';
import EventHeaderView from '../view/edit/header/event-header-view';
import EventTypeView from '../view/edit/header/event-type-view';
import ListView from '../view/list/list-view';
import SortView from '../view/list/sort-view';
import WaypointView from '../view/list/waypoint-view';
import DeleteButtonView from '../view/edit/header/delete-button-view';
import RollupButtonView from '../view/edit/header/rollup-button-view';


export default class Presenter {
  list = new ListView();
  editForm = new EditView();

  constructor({container, model}) {
    this.container = container;
    this.model = model;
  }

  // ❔ Допустимо выносить часть логики в функцию в presenter?
  // Не нарушает ли это Д26?
  // ❔ Допустимо ли использовать стрелочные функции внутри класса?
  // Как иначе избежать потери окружения?
  render = (waypoint) => {
    render(
      new WaypointView({waypoint}),
      this.list.getElement());
  };

  init() {
    this.waypoints = [...this.model.getWaypoints()];

    render(new SortView(), this.container);

    render(this.editForm, this.container);

    this.editingWaypoint = this.waypoints[0];
    this.eventHeader = new EventHeaderView(this.waypoints);
    render(this.eventHeader, this.editForm.getElement(), RenderPosition.AFTERBEGIN);
    render(new EventTypeView({waypoint: this.editingWaypoint}), this.eventHeader.getElement(), RenderPosition.AFTERBEGIN);
    render(new DeleteButtonView(), this.eventHeader.getElement());
    render(new RollupButtonView(), this.eventHeader.getElement());

    this.eventDetails = new EventDetailsView({waypoint: this.editingWaypoint});
    render(this.eventDetails, this.editForm.getElement());

    render(this.list, this.container);
    for (let i = 1; i < this.waypoints.length; i++) {
      this.render(this.waypoints[i]);
    }
  }
}
