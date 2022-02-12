import { getInput } from './helpers';

const median = (numbers: number[]): number => {
  const orderedNumbers = numbers.sort((a, b) => a - b);
  const middleIndex = Math.floor((orderedNumbers.length - 1) / 2);
  if (orderedNumbers.length % 2) {
    return orderedNumbers[middleIndex];
  } else {
    return (orderedNumbers[middleIndex] + orderedNumbers[middleIndex + 1]) / 2
  }
}

const input = getInput(7).split(',').map(Number);
const optimum = median(input);
const fuelExpended = Math.round(input.reduce((sum, current) => sum + Math.abs(current - optimum), 0));
console.log(fuelExpended);
