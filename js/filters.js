import {debouncedAddMarkers, clearLayers, resetMarkers, addMarkers} from './map.js';
import {setElementDisabled, getSelectedValue} from './utils.js';
import {getData} from './api.js';
import {showAlert} from './message.js';

const MAX_LENGTH = 10;
const DEFAULT_VALUE = 'any';
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
const PricesRange = {
  low: {
    MIN: 0,
    MAX: 10000,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50000,
    MAX: 100000,
  },
};
const sortData = {
  [Offer.TYPE]: DEFAULT_VALUE,
  [Offer.PRICE]: DEFAULT_VALUE,
  [Offer.ROOMS]: DEFAULT_VALUE,
  [Offer.GUESTS]: DEFAULT_VALUE,
  [Offer.FEATURES]: []
};

const filtersElement = document.querySelector('.map__filters');
const filterElements = filtersElement.querySelectorAll('.map__filter');
const featuresFilterElement = filtersElement.querySelector('.map__features');

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
  sortData.type = DEFAULT_VALUE;
  sortData.price = DEFAULT_VALUE;
  sortData.rooms = DEFAULT_VALUE;
  sortData.guests = DEFAULT_VALUE;
  sortData.features = [];
  try {
    const data = await getData();
    addMarkers(data);
  } catch (error) {
    showAlert(error);
  }
};

const checkPrice = (price, value) => {
  switch (value) {
    case Price.MIDDLE:
      return price >= PricesRange.middle.MIN && price <= PricesRange.middle.MAX;
    case Price.LOW:
      return price <= PricesRange.low.MIN;
    case Price.HIGH:
      return price >= PricesRange.high.MAX;
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
  let isVerified = true;

  for (const key in sortData) {
    if (isVerified) {
      if (sortData[key] === DEFAULT_VALUE) {
        continue;
      }
      switch (key) {
        case Offer.TYPE:
          isVerified = sortData.type === offer.type;
          break;
        case Offer.PRICE:
          isVerified = checkPrice(offer.price, sortData.price);
          break;
        case Offer.ROOMS:
          isVerified = +sortData.rooms === offer.rooms;
          break;
        case Offer.GUESTS:
          isVerified = +sortData.guests === offer.guests;
          break;
        case Offer.FEATURES:
          isVerified = checkFeatures(offer);
          break;
      }
    }
  }

  return isVerified;
};

const addFilteredOffers = (offers) => {
  const filteredOffers = [];

  for (const offer of offers) {
    if (filteredOffers.length === MAX_LENGTH) {
      return;
    }
    if (checkOffers(offer)) {
      filteredOffers.push(offer);
    }
  }

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

  filtersElement.addEventListener('change', (evt) => {
    const target = evt.target;

    if (target.closest('.map__features')) {
      addCheckedFeatures(evt);
    } else {
      sortData[target.dataset.type] = getSelectedValue(target);
    }
    addFilteredOffers(offers);
  });
};

setFiltersInactive();

export {initFilters, resetFilters};
