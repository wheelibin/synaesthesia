export const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isNumeric = value => {
  return !isNaN(value - parseFloat(value));
};
