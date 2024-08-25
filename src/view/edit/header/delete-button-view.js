import AbstractView from '/src/framework/view/abstract-view';


const createDeleteButtonTemplate = () =>
  '<button class="event__reset-btn" type="reset">Delete</button>';


export default class DeleteButtonView extends AbstractView {
  get template() {
    return createDeleteButtonTemplate();
  }
}
