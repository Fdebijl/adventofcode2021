import { getInput } from './helpers';

const segmentCountToCharMap: { [key: number]: number | undefined } = {
  1: undefined,
  2: 1,
  3: 7,
  4: 4,
  5: undefined,
  6: undefined,
  7: 8
}

const input = getInput(8).split('\n');
const output = input.reduce((sum, current) => {
  const [ ,outputValues ] = current.split('|');
  const out = sum += (outputValues.split(' ').map(segmentCount => segmentCountToCharMap[segmentCount.length]).filter(Boolean)).length;
  return out;
}, 0);

console.log(output);
