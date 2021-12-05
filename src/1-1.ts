import { getInput } from './helpers';

const input = getInput(1);
const lines = input.split('\n').map(string => Number.parseInt(string))
const result = lines.reduce((prev, current, index, array) => {
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