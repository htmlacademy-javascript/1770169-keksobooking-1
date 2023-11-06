import {sendData} from './api.js';
import {formElement, houseElement, priceElement} from './elements.js';
import {resetMarkers} from './map.js';
import {showErrorMessage, showSuccessMessage} from './message.js';
import {setElementDisabled, getSelectedValue} from './utils.js';
import {checkFormValidity, resetPristine, getErrors} from './validate.js';

const Price = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
  max: 100000
};
const DECIMALS = 5;

const sliderElement = document.querySelector('.ad-form__slider');
const headerElement = formElement.querySelector('.ad-form-header');
const groupElements = formElement.querySelectorAll('.ad-form__element');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const addressElement = formElement.querySelector('#address');
const submitElement = formElement.querySelector('.ad-form__submit');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000
  },
  step: 100,
  start: 0,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => value
  }
});

sliderElement.noUiSlider.on('slide', () => (priceElement.value = sliderElement.noUiSlider.get()));

priceElement.placeholder = Price[getSelectedValue(houseElement)].toString();

const changeHouseHandler = (evt) => {
  priceElement.placeholder = Price[evt.target.value].toString();
  priceElement.value = '';
  sliderElement.noUiSlider.reset();
};

const changeTimeInHandler = (evt) => (timeOutElement.value = evt.target.value);

const changeTimeOutHandler = (evt) => (timeInElement.value = evt.target.value);

const moveendAddressHandler = (lat, lng) => (addressElement.value = `${(lat).toFixed(DECIMALS)}, ${(lng).toFixed(DECIMALS)}`);

const setFormActive = () => {
  formElement.classList.remove('ad-form--disabled');
  setElementDisabled(headerElement, false);
  groupElements.forEach((element) => setElementDisabled(element, false));
};

const setFormInactive = () => {
  formElement.classList.add('ad-form--disabled');
  setElementDisabled(headerElement, true);
  groupElements.forEach((element) => setElementDisabled(element, true));
};

const addErrors = (errors) => {
  errors.forEach((error) => {
    const groupElement = error.input.closest('.ad-form__element');
    const errorElement = document.createElement('div');

    errorElement.classList.add('text-help');
    errorElement.textContent = error.errors[0];
    groupElement.classList.add('ad-form__element--invalid');
    groupElement.append(errorElement);
  });
};

const removeErrors = () => {
  const errorElements = formElement.querySelectorAll('.text-help');
  errorElements.forEach((element) => element.remove());
  groupElements.forEach((element) => element.classList.remove('ad-form__element--invalid'));
};

const submitFormHandler = async (evt) => {
  evt.preventDefault();
  removeErrors();

  if (!checkFormValidity()) {
    const errors = getErrors();
    addErrors(errors);
    return resetPristine();
  }
  const formData = new FormData(evt.target);

  try {
    setElementDisabled(submitElement, true);
    await sendData(formData);
    showSuccessMessage();
    setElementDisabled(submitElement, false);
    resetMarkers();
    sliderElement.noUiSlider.reset();
    formElement.reset();
  } catch {
    showErrorMessage();
    setElementDisabled(submitElement, false);
  }
};

const resetFormHandler = () => {
  formElement.reset();
  resetMarkers();
  sliderElement.noUiSlider.reset();
};

formElement.addEventListener('reset', resetFormHandler);
formElement.addEventListener('submit', submitFormHandler);
houseElement.addEventListener('change', changeHouseHandler);
timeInElement.addEventListener('change', changeTimeInHandler);
timeOutElement.addEventListener('change', changeTimeOutHandler);
priceElement.addEventListener('input', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
});

setFormInactive();

export {setFormActive, setFormInactive, moveendAddressHandler};
