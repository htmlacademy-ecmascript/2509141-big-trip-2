import AbstractView from '/src/framework/view/abstract-view';


const createEditTemplate = () =>
  '<form class="event event--edit" action="#" method="post"></form>';


export default class EditView extends AbstractView {
  get template() {
    return createEditTemplate();
  }
}
