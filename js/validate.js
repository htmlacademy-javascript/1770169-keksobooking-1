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
  [Room.ONE]: ['1'],
  [Room.TWO]: ['1', '2'],
  [Room.THREE]: ['1', '2', '3'],
  [Room.ONE_HUNDRED]: ['0'],
};
const guestsOption = {
  [Guest.ZERO]: ['100'],
  [Guest.ONE]: ['3'],
  [Guest.TWO]: ['2', '3'],
  [Guest.THREE]: ['1', '2', '3']
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
  const guestValue = getSelectedValue(guestElement);

  switch (value) {
    case Room.ONE:
      return roomsOption[1].some((item) => item === guestValue);
    case Room.TWO:
      return roomsOption[2].some((item) => item === guestValue);
    case Room.THREE:
      return roomsOption[3].some((item) => item === guestValue);
    case Room.ONE_HUNDRED:
      return roomsOption[100].some((item) => item === guestValue);
    default:
      return true;
  }
};

const guestValidate = (value) => {
  const roomValue = getSelectedValue(roomElement);

  switch (value) {
    case Guest.ONE:
      return guestsOption[3].some((item) => item === roomValue);
    case Guest.TWO:
      return guestsOption[2].some((item) => item === roomValue);
    case Guest.THREE:
      return guestsOption[1].some((item) => item === roomValue);
    case Guest.ZERO:
      return guestsOption[0].some((item) => item === roomValue);
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
