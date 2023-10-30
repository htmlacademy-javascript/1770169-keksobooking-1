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
const MAX_GUEST = {
  0: '100',
  1: '1',
  2: '2',
  3: '3',
};

const titleElement = formElement.querySelector('#title');
const priceElement = formElement.querySelector('#price');
const guestsElement = formElement.querySelector('#capacity');

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

const guestsValidate = (value) => {
  const roomElement = formElement.querySelector('#room_number');
  const selectedValue = roomElement.selectedOptions[0].value;
  console.log('guest: ', MAX_GUEST[value]);
  console.log('rooms: ', selectedValue);
  /* if ('1 room' === '1 guest') {
    return 'Одна комната для одного гостя';
  } else if ('2 room' === '2 guest' || '2 room' === '1 guest') {
    return 'Две комната для одного или двух гостей';
  } else if ('3 room' === '3 guest' || '3 room' === '2 guest'|| '3 room' === '1 guest') {
    return 'Три комнаты для одного, двух или трех гостей';
  } else if ('100 room' === '0 guest') {
    return 'Не для гостей';
  } */
};

pristine.addValidator(titleElement, titleValidate, `Длина заголовка не может быть меньше ${TitleLength.MIN} и больше ${TitleLength.MAX} символов!`);
pristine.addValidator(priceElement, priceValidate, getPriceErrorMessage);
pristine.addValidator(guestsElement, guestsValidate, getPriceErrorMessage);

const checkFormValidity = () => pristine.validate();
const resetPristine = () => pristine.reset();

export {checkFormValidity, resetPristine};
