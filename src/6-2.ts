import { getInput } from './helpers';

const input = getInput(6);
const GESTATION_TIME = 6;
const MAX_TICKS = 256;
// 256 ticks results in too many fish for an array-based approach, so we move over to buckets

const setupBuckets = (initialStateCounters: number[]) => {
  const buckets = new Array(9).fill(0);
  for (const fishCounter of initialStateCounters) {
    buckets[fishCounter]++;
  }
  return buckets;
}

const doTick = (fishInternalCounterBuckets: number[]): number[] => {
  // Get the count of new-born fish by removing all the zero-day fish
  let freshFish = fishInternalCounterBuckets.shift() as number;
  // Set these fish to birth a new fish in 8 days by putting the count of zero-day fish at the end of the array
  fishInternalCounterBuckets.push(freshFish);
  // Set the fish that just gave birth to give birth again in 6 days
  fishInternalCounterBuckets[GESTATION_TIME] += freshFish;

  return fishInternalCounterBuckets;
}

let fishInternalCounterBuckets = setupBuckets(input.split(',').map(Number));
for (let tick = 1; tick <= MAX_TICKS; tick++) {
  console.log(`Simulating tick ${tick} of ${MAX_TICKS}`);
  fishInternalCounterBuckets = doTick(fishInternalCounterBuckets);
}

console.log(fishInternalCounterBuckets.reduce((sum, current) => sum + current, 0));
