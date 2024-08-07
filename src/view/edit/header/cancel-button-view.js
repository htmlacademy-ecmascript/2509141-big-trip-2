import { createElement } from '../../../render.js';


const createCancelButtonTemplate = () =>
  '<button class="event__reset-btn" type="reset">Cancel</button>';


export default class CancelButtonView {
  getTemplate() {
    return createCancelButtonTemplate();
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
