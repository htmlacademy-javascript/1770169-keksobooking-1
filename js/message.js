import {isEscapeKey} from './utils.js';

const DELAY = 3000;

const bodyElement = document.querySelector('body');
const successTemplate = bodyElement.querySelector('#success').content.querySelector('.success');
const errorTemplate = bodyElement.querySelector('#error').content.querySelector('.error');
const successElement = successTemplate.cloneNode(true);
const errorElement = errorTemplate.cloneNode(true);

const showSuccessMessage = () => {
  bodyElement.append(successElement);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
};

const showErrorMessage = () => {
  bodyElement.append(errorElement);
  const buttonElement = errorElement.querySelector('.error__button');
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  buttonElement.addEventListener('click', buttonClickHandler);
};

const hideMessage = (element) => {
  element.remove();
  document.removeEventListener('keydown', documentKeydownHandler);
  document.removeEventListener('click', documentClickHandler);
};

function documentKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    if (bodyElement.contains(successElement)) {
      return hideMessage(successElement);
    }
    return hideMessage(errorElement);
  }
}

function documentClickHandler (evt) {
  if (errorElement === evt.target || successElement === evt.target) {
    hideMessage(evt.target);
  }
}

function buttonClickHandler () {
  hideMessage(errorElement);
}

const showAlert = (errorText) => {
  const alert = document.createElement('div');
  alert.classList.add('alert-message');
  alert.textContent = errorText;
  setTimeout(() => {
    alert.remove();
  }, DELAY);
  bodyElement.append(alert);
};

export {showSuccessMessage, showErrorMessage, showAlert};
