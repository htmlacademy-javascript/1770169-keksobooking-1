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

export {generateRandomNumber, generateRandomFloatNumber};
