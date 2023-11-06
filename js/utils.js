const DELAY = 500;

const generateRandomNumber = (min, max) => {
  const minNumber = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxNumber = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const randomNumber = Math.random() * (maxNumber - minNumber + 1) + minNumber;

  return Math.floor(randomNumber);
};

const generateRandomFloatNumber = (min, max, decimals) => {
  const isNumber = typeof min === 'number' && typeof max === 'number';
  const isPositiveNumber = min >= 0 || max >= 0;

  if (!isNumber || !isPositiveNumber || min >= max) {
    return NaN;
  }
  const randomNumber = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(randomNumber);
};

const getRandomElement = (elements) => elements[generateRandomNumber(0, elements.length - 1)];

const generateRandomElements = (elements) => {
  const randomElements = Array.from(
    {
      length: generateRandomNumber(1, elements.length)
    },
    () => getRandomElement(elements)
  );

  return new Set(randomElements);
};

const addZeroPad = (number) => number.toString().padStart(2, '0');

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
  generateRandomNumber,
  generateRandomFloatNumber,
  getRandomElement,
  generateRandomElements,
  addZeroPad,
  setElementDisabled,
  getSelectedValue,
  isEscapeKey,
  debounce
};
