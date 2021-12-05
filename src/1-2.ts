import { getInput } from './helpers';

const input = getInput(1);
const lines = input.split('\n').map(string => Number.parseInt(string))
const windows = lines.map((line, index, array) => {
  if (array[index + 1] + array[index + 2]) {
    return line + array[index + 1] + array[index + 2]
  } else {
    return 0;
  }
}).filter(Boolean);
console.log(windows);
const result = windows.reduce((prev, current, index, array) => {
  const lastDepth = array[index - 1];
  const currentDepth = array[index];
  if (lastDepth) {
    if (lastDepth < currentDepth) {
      return prev + 1;
    }
  }

  return prev;
}, 0)

console.log(result);