import { render, replace } from '/src/framework/render.js';
import { isEscapeKey } from '../util.js';
import EditView from '../view/edit/edit-view.js';
import ListView from '../view/list/list-view';
import SortView from '../view/list/sort-view';
import WaypointView from '../view/list/waypoint-view';


export default class Presenter {
  #list = new ListView(); // ❓ Почему это здесь, а не в конструкторе или init()?
  #container = null;

  #waypointsModel = null;
  #offersModel = null;

  #waypoints = [];

  constructor({container, waypointsModel, offersModel}) {
    this.#container = container;
    this.#waypointsModel = waypointsModel;
    this.#offersModel = offersModel;
  }


  init() {
    this.#waypoints = [...this.#waypointsModel.waypoints];

    this.#renderSortView();
    this.#renderWaypoints();
  }

  #renderSortView() {
    render(new SortView(), this.#container);
  }

  #renderWaypoints() {
    render(this.#list, this.#container);
    for (let i = 0; i < this.#waypoints.length; i++) {
      this.#render(this.#waypoints[i], this.#offersModel);
    }
  }

  #render(waypoint, offersModel) {
    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceToWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const waypointComponent = new WaypointView({
      waypoint,
      onEditClick: () => {
        replaceToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    // ❓ Для реализации переключения между View пришлось объединить множество компонентов в один EditView.
    // В результате он страшно раздулся и выглядит непотребно.
    // С этим можно что-то сделать?
    const editFormComponent = new EditView({
      waypoint,
      offersModel,
      onEditClick: () => {
        replaceToWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceToForm() {
      replace(editFormComponent, waypointComponent);
    }

    function replaceToWaypoint() {
      replace(waypointComponent, editFormComponent);
    }

    render(
      waypointComponent,
      this.#list.element);
  }
}
