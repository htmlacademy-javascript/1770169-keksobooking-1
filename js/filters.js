import {debouncedAddMarkers, clearLayers, resetMarkers, addMarkers} from './map.js';
import {setElementDisabled, getSelectedValue} from './utils.js';
import {getData} from './api.js';
import {showAlert} from './message.js';

const DEFAULT_VOLUME = 'any';
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
  [Offer.TYPE]: DEFAULT_VOLUME,
  [Offer.PRICE]: DEFAULT_VOLUME,
  [Offer.ROOMS]: DEFAULT_VOLUME,
  [Offer.GUESTS]: DEFAULT_VOLUME,
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

const resetFilters = async () => {
  filtersElement.reset();
  sortData.type = DEFAULT_VOLUME;
  sortData.price = DEFAULT_VOLUME;
  sortData.rooms = DEFAULT_VOLUME;
  sortData.guests = DEFAULT_VOLUME;
  sortData.features = [];
  try {
    const data = await getData();
    addMarkers(data);
  } catch {
    showAlert();
  }
};

const checkPrice = (price, value) => {
  switch (value) {
    case Price.MIDDLE:
      return price >= 10000 && price <= 50000;
    case Price.LOW:
      return price <= 10000;
    case Price.HIGH:
      return price >= 50000;
    default:
      return false;
  }
};

const checkFeatures = (offer) => sortData.features.every((feature) => {
  if (offer.features) {
    return offer.features.includes(feature);
  }
});

const checkOffers = ({offer}) => {
  const verifiedData = [];

  for (const key in sortData) {
    if (sortData[key] === DEFAULT_VOLUME) {
      continue;
    }
    switch (key) {
      case Offer.TYPE:
        verifiedData.push(sortData.type === offer.type);
        break;
      case Offer.PRICE:
        verifiedData.push(checkPrice(offer.price, sortData.price));
        break;
      case Offer.ROOMS:
        verifiedData.push(+sortData.rooms === offer.rooms);
        break;
      case Offer.GUESTS:
        verifiedData.push(+sortData.guests === offer.guests);
        break;
      case Offer.FEATURES:
        verifiedData.push(checkFeatures(offer));
        break;
    }
  }
  return verifiedData.every((item) => item);
};

const addFilteredOffers = (offers) => {
  const filteredOffers = offers.filter((offer) => checkOffers(offer));
  clearLayers();
  resetMarkers();
  debouncedAddMarkers(filteredOffers);
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
    sortData.guests = getSelectedValue(evt.target);
    addFilteredOffers(offers);
  });
  featuresFilterElement.addEventListener('change', (evt) => {
    addCheckedFeatures(evt);
    addFilteredOffers(offers);
  });
};

setFiltersInactive();

export {initFilters, resetFilters};
