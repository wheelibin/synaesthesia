export function randomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFromArray<T>(array: T[]): T {
  return array[randomIntBetween(0, array.length - 1)];
}

export function coinToss(): number {
  return Math.floor(Math.random() * 2);
}

export function shuffleArray<T>(array: T[]): T[] {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// export const runFunctionUntilCheckPasses = (fn, check, isDone, dispatch, getState) => {
//   if (isDone) return;
//   const promise = fn();
//   return promise.then((data) => runFunctionUntilCheckPasses(fn, check, check(dispatch, getState, data), dispatch));
// };
