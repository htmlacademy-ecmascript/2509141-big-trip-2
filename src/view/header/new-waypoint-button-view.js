import AbstractView from '/src/framework/view/abstract-view';


const createNewWaypointButtonTemplate = () =>
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';


export default class NewWaypointButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();

    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewWaypointButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
