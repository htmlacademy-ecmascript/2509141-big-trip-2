const createCancelButtonTemplate = (isDisabled) =>
  `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>`;

const createDeleteButtonTemplate = (isDisabled, isDeleting) =>
  `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
    ${isDeleting ? 'Deleting...' : 'Delete'}
  </button>`;

const createRollupButtonTemplate = (isDisabled) =>
  `<button class="event__rollup-btn" type="button"  ${isDisabled ? 'disabled' : ''}>
    <span class="visually-hidden">Open event</span>
  </button>`;


export {
  createCancelButtonTemplate,
  createDeleteButtonTemplate,
  createRollupButtonTemplate
};
