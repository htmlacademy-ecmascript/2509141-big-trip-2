import createDestinationTemplate from './destination';
import createOffersTemplate from './offers';


const createEventDetailsTemplate = ({offers, destination, allTypeOffers}) => {
  const hasOffers = allTypeOffers.length > 0;
  const offersTemplate = hasOffers ? createOffersTemplate(offers, allTypeOffers) : '';

  const hasDestination = !!destination;
  const destinationTemplate = hasDestination ? createDestinationTemplate(destination) : '';

  return `<section class="event__details">
            ${offersTemplate}
            ${destinationTemplate}
          </section>`;
};


export default createEventDetailsTemplate;
