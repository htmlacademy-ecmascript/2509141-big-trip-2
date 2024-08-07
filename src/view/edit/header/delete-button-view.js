import { createElement } from '../../../render.js';


const createDeleteButtonTemplate = () =>
  '<button class="event__reset-btn" type="reset">Delete</button>';


export default class DeleteButtonView {
  getTemplate() {
    return createDeleteButtonTemplate();
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
