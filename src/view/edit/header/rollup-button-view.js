import AbstractView from '/src/framework/view/abstract-view';


const createRollupButtonTemplate = () =>
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;


export default class RollupButtonView extends AbstractView {
  get template() {
    return createRollupButtonTemplate();
  }
}
