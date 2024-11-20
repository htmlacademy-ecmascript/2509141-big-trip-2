import { render } from '../framework/render';
import NewWaypointButtonView from '../view/header/new-waypoint-button-view';


// ❓ Перенёс управление кнопкой добавления новой точки в собственный презентер.
// Но часть методов и связей пришлось оставить в main.
// Насколько текущее состояние соответствует архитектуре?
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

  // ❓ В проекте используются три схемы наименования обработчиков:
  // onElementClick, elementClickHandler и handleElementClick
  // Я не до конца понимаю в чем между ними разница, особенно между последними двумя
  // и потому не уверен, что всегда использовал их уместо.
  #newWaypointButtonClickHandler = () => {
    this.#handleButtonClick();
    this.disable();
  };

  #renderButton() {
    render(this.#newWaypointButtonComponent, this.#container);
  }
}
