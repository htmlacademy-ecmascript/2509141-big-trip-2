import { createElement } from '../../render.js';


const createEditTemplate = () =>
  '<form class="event event--edit" action="#" method="post"></form>';


export default class EditView {
  getTemplate() {
    return createEditTemplate();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
