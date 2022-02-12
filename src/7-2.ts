import { getInput } from './helpers';

// Naive approach, just loop over all positions and find the least expensive one
const crabPositions = getInput(7).split(',').map(Number);
const min = Math.min(...crabPositions);
const max = Math.max(...crabPositions);

const fuelConsumptions = [];
for (let i = min; i < max; i++) {
  fuelConsumptions.push(crabPositions.reduce((sum, currentPosition) => {
    const diff = Math.abs(currentPosition - i);
    let fuelConsumption = 0;
    for (let j = 1; j <= diff; j++) {
      fuelConsumption += j;
    }
    return sum + fuelConsumption;
  }, 0));
}

console.log(Math.min(...fuelConsumptions));
