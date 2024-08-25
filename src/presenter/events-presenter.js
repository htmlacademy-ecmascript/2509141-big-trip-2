import { render, RenderPosition } from '/src/framework/render.js';
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
  #list = new ListView();
  #editForm = new EditView();

  #container = null;
  #model = null;

  #waypoints = [];

  constructor({container, model}) {
    this.#container = container;
    this.#model = model;
  }


  render = (waypoint) => {
    render(
      new WaypointView({waypoint}),
      this.#list.element);
  };

  init() {
    this.#waypoints = [...this.#model.waypoints];

    render(new SortView(), this.#container);

    render(this.#editForm, this.#container);

    this.editingWaypoint = this.#waypoints[0];
    this.eventHeader = new EventHeaderView(this.#waypoints);
    render(this.eventHeader, this.#editForm.element, RenderPosition.AFTERBEGIN);
    render(new EventTypeView({waypoint: this.editingWaypoint}), this.eventHeader.element, RenderPosition.AFTERBEGIN);
    render(new DeleteButtonView(), this.eventHeader.element);
    render(new RollupButtonView(), this.eventHeader.element);

    this.eventDetails = new EventDetailsView({waypoint: this.editingWaypoint});
    render(this.eventDetails, this.#editForm.element);

    render(this.#list, this.#container);
    for (let i = 1; i < this.#waypoints.length; i++) {
      this.render(this.#waypoints[i]);
    }
  }
}
