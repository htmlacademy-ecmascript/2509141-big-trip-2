import { TYPES } from '/src/const';


const createTypeItemTemplate = (id, type, checkedType) => {
  const checked = (type === checkedType) ? 'checked' : '';

  return (`<div class="event__type-item">
    <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-${id}">${type}</label>
  </div>`);
};


const createEventTypeTemplate = ({id, type}) =>
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${TYPES.map((typeName) => createTypeItemTemplate(id, typeName, type)).join('')}
      </fieldset>
    </div>
  </div>`;


export default createEventTypeTemplate;
