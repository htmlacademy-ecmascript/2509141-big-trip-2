import { render } from '../framework/render';
import NewWaypointButtonView from '../view/header/new-waypoint-button-view';


export default class NewWaypointButtonPresenter {
  #container = null;
  #handleButtonClick = null;
  #newWaypointButtonComponent = null;


  constructor({container, onClick}) {
    this.#container = container;

    this.#handleButtonClick = onClick;

    this.#newWaypointButtonComponent = new NewWaypointButtonView({onClick: this.#newWaypointButtonClickHandler});

    this.#renderButton();
    this.disable();
  }

  disable = () => {
    this.#newWaypointButtonComponent.element.disabled = true;
  };

  enable = () => {
    this.#newWaypointButtonComponent.element.disabled = false;
  };


  #newWaypointButtonClickHandler = () => {
    this.#handleButtonClick();
    this.disable();
  };

  #renderButton() {
    render(this.#newWaypointButtonComponent, this.#container);
  }
}
