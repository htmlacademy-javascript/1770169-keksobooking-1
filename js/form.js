import {formElement} from './elements.js';
import {allowElement, disableElement} from './utils.js';

const headerElement = formElement.querySelector('.ad-form-header');
const groupElements = formElement.querySelectorAll('.ad-form__element');

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

//setInactiveForm();
