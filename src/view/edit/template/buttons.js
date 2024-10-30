const createCancelButtonTemplate = () =>
  '<button class="event__reset-btn" type="reset">Cancel</button>';

const createDeleteButtonTemplate = () =>
  '<button class="event__reset-btn" type="reset">Delete</button>';

const createRollupButtonTemplate = () =>
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;


export {
  createCancelButtonTemplate,
  createDeleteButtonTemplate,
  createRollupButtonTemplate
};
