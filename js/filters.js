import {addMarkers, clearMarkers, resetMarkers} from './map.js';
import {setElementDisabled} from './utils.js';
import {getSelectedValue} from './utils.js';

const ANY_VOLUME = 'any';

const Price = {
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high',
};
const features = [];

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

const filterElementByType = (offers, type) => {
  if (type === ANY_VOLUME) {
    return offers;
  }
  return offers.filter((item) => item.offer.type === type);
};

const filterElementByPrice = (offers, price) => {
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
};

const filterElementByRooms = (offers, roomCount) => {
  if (roomCount === ANY_VOLUME) {
    return offers;
  }
  return offers.filter((item) => item.offer.rooms === +roomCount);
};

const filterElementByGuests = (offers, guestCount) => {
  if (guestCount === ANY_VOLUME) {
    return offers;
  }
  return offers.filter((item) => item.offer.guests === +guestCount);
};

const filterElementByFeatures = (offers, neededFeatures) => offers.filter((item) => neededFeatures.every((feature) => {
  const verifiableFeatures = item.offer.features;
  if (verifiableFeatures) {
    return verifiableFeatures.includes(feature);
  }
}));

const changeFilterHandler = (evt, offers, cb) => {
  const type = getSelectedValue(evt.target);
  //clearMarkers();
  resetMarkers();
  addMarkers(cb(offers, type));
};

const changeFeaturesHandler = (evt, offers) => {
  const {checked, value} = evt.target;

  if (evt.target.closest('.map__checkbox')) {
    if (checked && !features.includes(value)) {
      features.push(value);
    }

    if (!checked && features.includes(value)) {
      const index = features.findIndex((item) => value === item);
      features.splice(index, 1);
    }

    //clearMarkers();
    resetMarkers();
    addMarkers(filterElementByFeatures(offers, features));
  }
};

const initFilters = (offers) => {
  setFiltersActive();

  typeFilterElement.addEventListener('change', (evt) => changeFilterHandler(evt, offers, filterElementByType));
  priceFilterElement.addEventListener('change', (evt) => changeFilterHandler(evt, offers, filterElementByPrice));
  roomsFilterElement.addEventListener('change', (evt) => changeFilterHandler(evt, offers, filterElementByRooms));
  guestsFilterElement.addEventListener('change', (evt) => changeFilterHandler(evt, offers, filterElementByGuests));
  featuresFilterElement.addEventListener('change', (evt) => changeFeaturesHandler(evt, offers));
};

setFiltersInactive();

export {setFiltersInactive, initFilters};
