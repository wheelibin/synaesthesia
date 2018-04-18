export const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isNumeric = value => {
  return !isNaN(value - parseFloat(value));
};

export const randomFromArray = array => {
  return array[randomIntBetween(0, array.length - 1)];
};

export const coinToss = () => {
  return Math.floor(Math.random() * 2);
};

export const shuffleArray = array => {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};

export const runFunctionUntilCheckPasses = (fn, check, isDone, dispatch, getState) => {
  if (isDone) return;
  const promise = fn();
  return promise.then(data => runFunctionUntilCheckPasses(fn, check, check(dispatch, getState, data), dispatch));
};
