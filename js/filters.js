import {addMarkers, clearMarkers, resetMarkers} from './map.js';
import {setElementDisabled} from './utils.js';
import {getSelectedValue} from './utils.js';

const ANY_VOLUME = 'any';
const Offer = {
  TYPE: 'type',
  PRICE: 'price',
  ROOMS: 'rooms',
  GUESTS: 'guests',
  FEATURES: 'features'
};
const Price = {
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high',
};
const sortData = {
  [Offer.TYPE]: null,
  [Offer.PRICE]: null,
  [Offer.ROOMS]: null,
  [Offer.GUESTS]: null,
  [Offer.FEATURES]: []
};

const filtersElement = document.querySelector('.map__filters');
const filterElements = filtersElement.querySelectorAll('.map__filter');
const typeFilterElement = filtersElement.querySelector('#housing-type');
const priceFilterElement = filtersElement.querySelector('#housing-price');
const roomsFilterElement = filtersElement.querySelector('#housing-rooms');
const guestsFilterElement = filtersElement.querySelector('#housing-guests');
const featuresFilterElement = filtersElement.querySelector('#housing-features');

const setFiltersActive = () => {
  filtersElement.classList.remove('map__filters--disabled');
  filterElements.forEach((element) => setElementDisabled(element, false));
  setElementDisabled(featuresFilterElement, false);
};

const setFiltersInactive = () => {
  filtersElement.classList.add('map__filters--disabled');
  filterElements.forEach((element) => setElementDisabled(element, true));
  setElementDisabled(featuresFilterElement, true);

};

/*const filterElementByPrice = (offers, price) => {
  switch (price) {
    case Price.MIDDLE:
      return offers.filter((item) => item.offer.price >= 10000 && item.offer.price <= 50000);
    case Price.LOW:
      return offers.filter((item) => item.offer.price <= 10000);
    case Price.HIGH:
      return offers.filter((item) => item.offer.price >= 50000);
    default:
      return offers;
  }
};*/

const resetSortData = () => {
  sortData.type = null;
  sortData.price = null;
  sortData.rooms = null;
  sortData.guest = null;
  sortData.features = [];
};

const checkPrice = (price, value) => {
  switch (value) {
    case Price.MIDDLE:
      return price >= 10000 && price <= 50000;
    case Price.LOW:
      return price <= 10000;
    case Price.HIGH:
      return price >= 50000;
  }
};

const checkFeatures = (offer) => sortData.features.every((feature) => {
  if (offer.features) {
    return offer.features.includes(feature);
  }
});

const checkOffers = ({offer}) => {
  const checked = [];
  for (const key in sortData) {
    switch (key) {
      case Offer.TYPE:
        if (sortData.type === ANY_VOLUME || sortData.type === null) {
          checked.push(true);
          break;
        }
        checked.push(sortData.type === offer.type);
        break;
      case Offer.PRICE:
        if (sortData.price === ANY_VOLUME || sortData.price === null) {
          checked.push(true);
          break;
        }
        checked.push(checkPrice(offer.price, sortData.price));
        break;
      case Offer.ROOMS:
        if (sortData.rooms === ANY_VOLUME || sortData.rooms === null) {
          checked.push(true);
          break;
        }
        checked.push(+sortData.rooms === offer.rooms);
        break;
      case Offer.GUESTS:
        if (sortData.guests === ANY_VOLUME || sortData.guests === null) {
          checked.push(true);
          break;
        }
        checked.push(+sortData.guests === offer.guests);
        break;
      case Offer.FEATURES:
        checked.push(checkFeatures(offer));
        break;
    }
  }
  return checked.every((item) => item);
};

const addFilteredOffers = (offers) => {
  const filteredOffers = offers.filter((offer) => checkOffers(offer));
  clearMarkers();
  resetMarkers();
  addMarkers(filteredOffers);
  resetSortData();
};

const addCheckedFeatures = (evt) => {
  const {checked, value} = evt.target;

  if (evt.target.closest('.map__checkbox')) {
    if (checked && !sortData.features.includes(value)) {
      sortData.features.push(value);
    }

    if (!checked && sortData.features.includes(value)) {
      const index = sortData.features.findIndex((item) => value === item);
      sortData.features.splice(index, 1);
    }
  }
};

const initFilters = (offers) => {
  setFiltersActive();

  typeFilterElement.addEventListener('change', (evt) => {
    sortData.type = getSelectedValue(evt.target);
    addFilteredOffers(offers);
  });
  priceFilterElement.addEventListener('change', (evt) => {
    sortData.price = getSelectedValue(evt.target);
    addFilteredOffers(offers);
  });
  roomsFilterElement.addEventListener('change', (evt) => {
    sortData.rooms = getSelectedValue(evt.target);
    addFilteredOffers(offers);
  });
  guestsFilterElement.addEventListener('change', (evt) => {
    sortData.guest = getSelectedValue(evt.target);
    addFilteredOffers(offers);
  });
  featuresFilterElement.addEventListener('change', (evt) => {
    addCheckedFeatures(evt);
    addFilteredOffers(offers);
  });
};

setFiltersInactive();

export {setFiltersInactive, initFilters};
