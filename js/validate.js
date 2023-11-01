import {formElement, houseElement, priceElement} from './elements.js';
import {getSelectedValue} from './utils.js';

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
const Room = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  ONE_HUNDRED: '100'
};
const Guest = {
  ZERO: '0',
  ONE: '1',
  TWO: '2',
  THREE: '3'
};

const titleElement = formElement.querySelector('#title');
const roomElement = formElement.querySelector('#room_number');
const guestElement = formElement.querySelector('#capacity');

const pristine = new Pristine(formElement, {
  classTo: 'notice',
  errorClass: 'text--error',
  successClass: 'text--success',
  errorTextParent: 'notice',
  errorTextTag: 'div',
  errorTextClass: 'text__error-message'
});

const titleValidate = (value) => value.length >= TitleLength.MIN && value.length <= TitleLength.MAX;

const getTitleErrorMessage = () => `Длина заголовка не может быть меньше ${TitleLength.MIN} и больше ${TitleLength.MAX} символов!`;

const priceValidate = (value) => {
  const price = parseInt(value, 10);

  return price >= MIN_HOUSING_PRICE[getSelectedValue(houseElement)] && price <= MAX_PRICE_COUNT;
};

const getPriceErrorMessage = () => `Стоимость не может быть меньше ${MIN_HOUSING_PRICE[getSelectedValue()]} и больше ${MAX_PRICE_COUNT} рублей!`;

const roomValidate = (value) => {
  switch (value) {
    case Room.ONE:
      return getSelectedValue(guestElement) === Guest.ONE;
    case Room.TWO:
      return getSelectedValue(guestElement) === Guest.ONE ||
        getSelectedValue(guestElement) === Guest.TWO;
    case Room.THREE:
      return getSelectedValue(guestElement) === Guest.ONE ||
        getSelectedValue(guestElement) === Guest.TWO ||
        getSelectedValue(guestElement) === Guest.THREE;
    case Room.ONE_HUNDRED:
      return getSelectedValue(guestElement) === Guest.ZERO;
    default:
      return true;
  }
};

const guestValidate = (value) => {
  switch (value) {
    case Guest.ONE:
      return getSelectedValue(roomElement) === Room.ONE ||
        getSelectedValue(roomElement) === Room.TWO ||
        getSelectedValue(roomElement) === Room.THREE;
    case Guest.TWO:
      return getSelectedValue(roomElement) === Room.TWO ||
        getSelectedValue(roomElement) === Room.THREE;
    case Guest.THREE:
      return getSelectedValue(roomElement) === Room.THREE;
    case Guest.ZERO:
      return getSelectedValue(roomElement) === Room.ONE_HUNDRED;
    default:
      return true;
  }
};

const getErrorMessage = () => {
  const roomUnit = getSelectedValue(roomElement) === Room.ONE ? 'комната' : 'комнаты';
  const guestUnit = getSelectedValue(guestElement) === Guest.ONE ? 'гостя' : 'гостей';
  return getSelectedValue(roomElement) === Room.ONE_HUNDRED || getSelectedValue(guestElement) === Guest.ZERO ?
    'Не для гостей' :
    `${getSelectedValue(roomElement)} ${roomUnit} не для ${getSelectedValue(guestElement)} ${guestUnit}`;
};

pristine.addValidator(titleElement, titleValidate, getTitleErrorMessage);
pristine.addValidator(priceElement, priceValidate, getPriceErrorMessage);

pristine.addValidator(roomElement, roomValidate, getErrorMessage);
pristine.addValidator(guestElement, guestValidate, getErrorMessage);

const checkFormValidity = () => pristine.validate();
const resetPristine = () => pristine.reset();

export {checkFormValidity, resetPristine};
