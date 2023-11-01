import {formElement, houseElement, priceElement} from './elements.js';
import {allowElement, disableElement, getSelectedValue} from './utils.js';

const MIN_HOUSING_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};

const headerElement = formElement.querySelector('.ad-form-header');
const groupElements = formElement.querySelectorAll('.ad-form__element');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');

priceElement.placeholder = MIN_HOUSING_PRICE[getSelectedValue(houseElement)];

const changeHouseHandler = (evt) => {
  priceElement.placeholder = MIN_HOUSING_PRICE[evt.target.value];
};

const changeTimeInHandler = (evt) => {
  timeOutElement.value = evt.target.value;
};

const changeTimeOutHandler = (evt) => {
  timeInElement.value = evt.target.value;
};

const setActiveForm = () => {
  formElement.classList.remove('ad-form--disabled');
  allowElement(headerElement);
  groupElements.forEach((element) => allowElement(element));
};

const setInactiveForm = () => {
  formElement.classList.add('ad-form--disabled');
  disableElement(headerElement);
  groupElements.forEach((element) => disableElement(element));
};

houseElement.addEventListener('change', changeHouseHandler);
timeInElement.addEventListener('change', changeTimeInHandler);
timeOutElement.addEventListener('change', changeTimeOutHandler);

setInactiveForm();

export {setActiveForm, setInactiveForm};
