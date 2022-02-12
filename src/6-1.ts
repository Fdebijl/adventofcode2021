import { getInput } from './helpers';

const input = getInput(6);
const GESTATION_TIME = 6;
const FRESH_FISH_GESTATION_TIME = 8;
const MAX_TICKS = 80;

const doTick = (fishInternalCounters: number[]): number[] => {
  let freshFish = 0;

  const currentFish = fishInternalCounters.map(internalCounter => {
    if (internalCounter === 0) {
      freshFish++;
      internalCounter = GESTATION_TIME;
    } else {
      internalCounter--;
    }

    return internalCounter;
  });

  return [...currentFish, ...new Array(freshFish).fill(FRESH_FISH_GESTATION_TIME)] as number[]
}

let fishInternalCounters = input.split(',').map(Number);
for (let tick = 1; tick <= MAX_TICKS; tick++) {
  console.log(`Simulating tick ${tick} of ${MAX_TICKS}`);
  fishInternalCounters = doTick(fishInternalCounters);
}

console.log(fishInternalCounters.length);
