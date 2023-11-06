import {formElement, houseElement, priceElement} from './elements.js';
import {getSelectedValue} from './utils.js';

const TitleLength = {
  MIN: 30,
  MAX: 100
};

const Price = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
  max: 100000
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
const roomsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const titleElement = formElement.querySelector('#title');
const roomElement = formElement.querySelector('#room_number');
const guestElement = formElement.querySelector('#capacity');

const pristine = new Pristine(formElement);

const titleValidate = (value) => value.length >= TitleLength.MIN && value.length <= TitleLength.MAX;

const getTitleErrorMessage = () => `Минимальная длина заголовка ${TitleLength.MIN}, а максимальная ${TitleLength.MAX}`;

const priceValidate = (value) => {
  const price = parseInt(value, 10);

  return price >= Price[getSelectedValue(houseElement)] && price <= Price.max;
};

const getPriceErrorMessage = () => `Для выбранного типа жилья минимальная цена ${Price[getSelectedValue(houseElement)]}, а максимальная ${Price.max} рублей.`;

const roomValidate = (value) => {
  const selectedValue = getSelectedValue(guestElement);

  /*switch (value) {
    case Room.ONE:
      return selectedValue === Guest.ONE;
    case Room.TWO:
      return selectedValue === Guest.ONE ||
      selectedValue === Guest.TWO;
    case Room.THREE:
      return selectedValue === Guest.ONE ||
      selectedValue === Guest.TWO ||
      selectedValue === Guest.THREE;
    case Room.ONE_HUNDRED:
      return selectedValue === Guest.ZERO;
    default:
      return true;
  }*/
  switch (value) {
    case Room.ONE:
      return roomsOption[1].some((item) => item === selectedValue);
    case Room.TWO:
      return roomsOption[2].some((item) => item === selectedValue);
    case Room.THREE:
      return roomsOption[3].some((item) => item === selectedValue);
    case Room.ONE_HUNDRED:
      return roomsOption[100].some((item) => item === selectedValue);
    default:
      return true;
  }
};

const guestValidate = (value) => {
  const selectedValue = getSelectedValue(roomElement);

  /*switch (value) {
    case Guest.ONE:
      return selectedValue === Room.ONE ||
      selectedValue === Room.TWO ||
      selectedValue === Room.THREE;
    case Guest.TWO:
      return selectedValue === Room.TWO ||
      selectedValue === Room.THREE;
    case Guest.THREE:
      return selectedValue === Room.THREE;
    case Guest.ZERO:
      return selectedValue === Room.ONE_HUNDRED;
    default:
      return true;
  }*/
  switch (value) {
    case Guest.ONE:
      return roomsOption[3].some((item) => item === selectedValue);
    case Guest.TWO:
      return roomsOption[2].some((item) => item === selectedValue);
    case Guest.THREE:
      return roomsOption[1].some((item) => item === selectedValue);
    case Guest.ONE_HUNDRED:
      return roomsOption[100].some((item) => item === selectedValue);
    default:
      return true;
  }
};

const getErrorMessage = () => {
  const roomValue = getSelectedValue(roomElement);
  const guestValue = getSelectedValue(guestElement);
  const roomUnit = roomValue === Room.ONE ? 'комната' : 'комнаты';
  const guestUnit = guestValue === Guest.ONE ? 'гостя' : 'гостей';

  return roomValue === Room.ONE_HUNDRED || guestValue === Guest.ZERO ?
    'Не для гостей' :
    `${roomValue} ${roomUnit} не для ${guestValue} ${guestUnit}`;
};

pristine.addValidator(titleElement, titleValidate, getTitleErrorMessage);
pristine.addValidator(priceElement, priceValidate, getPriceErrorMessage);
pristine.addValidator(roomElement, roomValidate, getErrorMessage);
pristine.addValidator(guestElement, guestValidate, getErrorMessage);

const checkFormValidity = () => pristine.validate();
const resetPristine = () => pristine.reset();
const getErrors = () => pristine.getErrors();

export {checkFormValidity, resetPristine, getErrors};
