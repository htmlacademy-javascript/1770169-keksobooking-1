import {formElement} from './elements.js';

const TitleLength = {
  MIN: 30,
  MAX: 100
};
const MAX_PRICE_COUNT = 100000;
const MIN_HOUSING_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};

const titleElement = formElement.querySelector('#title');
const priceElement = formElement.querySelector('#price');
const roomElement = formElement.querySelector('#room_number');

const pristine = new Pristine(formElement, {
  classTo: 'notice',
  errorClass: 'text--error',
  successClass: 'text--success',
  errorTextParent: 'notice',
  errorTextTag: 'div',
  errorTextClass: 'text__error-message'
});

const getSelectedValue = () => {
  const selectElement = formElement.querySelector('#type');

  return selectElement.selectedOptions[0].value;
};

const titleValidate = (value) => value.length >= TitleLength.MIN && value.length <= TitleLength.MAX;

const priceValidate = (value) => {
  const price = parseInt(value, 10);

  return price >= MIN_HOUSING_PRICE[getSelectedValue()] && price <= MAX_PRICE_COUNT;
};

function getPriceErrorMessage () {
  return `Стоимость не может быть меньше ${MIN_HOUSING_PRICE[getSelectedValue()]} и больше ${MAX_PRICE_COUNT} рублей!`;
}

const getGuestValue = () => {
  const guestsElement = formElement.querySelector('#capacity');
  return guestsElement.selectedOptions[0].value;
};

const hundredRoomValidate = (value) => {
  if (value === '100') {
    return getGuestValue() === '0';
  }
  return true;
};
const oneRoomValidate = (value) => {
  if (value === '1') {
    return getGuestValue() === '1';
  }
  return true;
};
const twoRoomValidate = (value) => {
  if (value === '2') {
    return getGuestValue() === '1' || getGuestValue() === '2';
  }
  return true;
};
const threeRoomValidate = (value) => {
  if (value === '3') {
    return getGuestValue() === '1' || getGuestValue() === '2' || getGuestValue() === '3';
  }
  return true;
};

pristine.addValidator(titleElement, titleValidate, `Длина заголовка не может быть меньше ${TitleLength.MIN} и больше ${TitleLength.MAX} символов!`);
pristine.addValidator(priceElement, priceValidate, getPriceErrorMessage);
pristine.addValidator(roomElement, hundredRoomValidate, 'Не для гостей');
pristine.addValidator(roomElement, oneRoomValidate, 'Одна комната для одного гостя');
pristine.addValidator(roomElement, twoRoomValidate, 'Две комнаты для одного или двух гостей');
pristine.addValidator(roomElement, threeRoomValidate, 'Три комнаты для одного, двух или трех гостей');

const checkFormValidity = () => pristine.validate();
const resetPristine = () => pristine.reset();

export {checkFormValidity, resetPristine};
