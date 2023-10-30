import {allowElement, disableElement} from './utils.js';

const filtersElement = document.querySelector('.map__filters');
const filterElements = filtersElement.querySelectorAll('.map__filter');
const featuresElement = filtersElement.querySelector('.map__features');

const setActiveFilters = () => {
  filtersElement.classList.add('map__filters--disabled');
  filterElements.forEach((element) => allowElement(element));
  allowElement(featuresElement);
};

const setInactiveFilters = () => {
  filtersElement.classList.add('map__filters--disabled');
  filterElements.forEach((element) => disableElement(element));
  disableElement(featuresElement);

};

setInactiveFilters();
