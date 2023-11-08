const DELAY = 500;

const setElementDisabled = (element, isDisabled) => (element.disabled = isDisabled);

const getSelectedValue = (selectElement) => selectElement.selectedOptions[0].value;

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), timeoutDelay);
  };
};

export {
  setElementDisabled,
  getSelectedValue,
  isEscapeKey,
  debounce
};
