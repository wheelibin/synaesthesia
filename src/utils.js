export const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isNumeric = value => {
  return !isNaN(value - parseFloat(value));
};

export const randomFromArray = array => {
  return array[randomIntBetween(0, array.length - 1)];
};
