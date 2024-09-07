const createPhotoTemplate = ({src, description}) =>
  `<img class="event__photo" src="${src}" alt="${description}">`;


const createPhotosTemplate = (pictures) => {
  if (pictures.length === 0) {
    return '';
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(createPhotoTemplate).join('')}
      </div>
    </div>`;
};


const createDestinationTemplate = ({description, pictures}) =>
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createPhotosTemplate(pictures)}
  </section>`;


export default createDestinationTemplate;
