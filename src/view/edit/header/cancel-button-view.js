import AbstractView from '/src/framework/view/abstract-view';


const createCancelButtonTemplate = () =>
  '<button class="event__reset-btn" type="reset">Cancel</button>';


export default class CancelButtonView extends AbstractView {
  get template() {
    return createCancelButtonTemplate();
  }
}
