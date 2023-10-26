const ArrayLength = {
  MIN: 1,
  MAX: 5
};

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
      length: generateRandomNumber(ArrayLength.MIN, ArrayLength.MAX)
    },
    () => getRandomElement(elements)
  );

  return new Set(randomElements);
};

const addZeroPad = (number) => number.toString().padStart(2, '0');

export {generateRandomNumber, generateRandomFloatNumber, getRandomElement, generateRandomElements, addZeroPad};
