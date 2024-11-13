const createCancelButtonTemplate = (status) =>
  `<button class="event__reset-btn" type="reset" ${status.isDisabled ? 'disabled' : ''}>Cancel</button>`;

const createDeleteButtonTemplate = (status) =>
  `<button class="event__reset-btn" type="reset" ${status.isDisabled ? 'disabled' : ''}>Delete</button>`;

const createRollupButtonTemplate = (status) =>
  `<button class="event__rollup-btn" type="button"  ${status.isDisabled ? 'disabled' : ''}>
    <span class="visually-hidden">Open event</span>
  </button>`;


export {
  createCancelButtonTemplate,
  createDeleteButtonTemplate,
  createRollupButtonTemplate
};
