import createDestinationTemplate from './destination';
import createOffersTemplate from './offers';


const createEventDetailsTemplate = (waypoint, offersModel) => {
  const hasOffers = offersModel.getOffers(waypoint.type).length > 0;
  const offersTemplate = hasOffers ? createOffersTemplate(waypoint, offersModel) : '';

  const hasDestination = waypoint.destination;
  const destinationTemplate = hasDestination ? createDestinationTemplate(waypoint.destination) : '';

  return `<section class="event__details">
            ${offersTemplate}
            ${destinationTemplate}
          </section>`;
};


export default createEventDetailsTemplate;
