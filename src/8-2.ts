//
// WIP
//

import { getInput } from './helpers';

type SegmentKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'
type SegmentMap = { [key in SegmentKey]: SegmentKey[]; };
type DigitInfo = {
  value: string;
  digit: number | undefined;
  normalSegments: SegmentKey[];
}

const segmentCountToDigitMap: { [key: number]: number | undefined } = {
  1: undefined,
  2: 1,
  3: 7,
  4: 4,
  5: undefined,
  6: undefined,
  7: undefined
}

const digitToSegmentMap: { [key: number]: SegmentKey[] } =  {
  1: [ 'c', 'f' ],
  4: [ 'b', 'c', 'd', 'f' ],
  7: [ 'a', 'c', 'f'],
  8: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
}

/** Map the fauly segment to the segment they would normally activate */
const segmentToSegmentMap = {
  a: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
  b: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
  c: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
  d: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
  e: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
  f: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
  g: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
}

// Find all the 1, 4, 7, 8
// Check wich segments they normaly activate
// On the normal segments in the map, filter out all segments that aren't activated erroneously
// This should yield a complete segmentToSegmentMap

// TODO: Refactor these maps, filters and foreaches into methods
const input = getInput(8).split('\n');
for (const entry of input) {
  const [ signalPatterns, outputValues ] = entry.split('|');
  const entrySegmentMap: SegmentMap = JSON.parse(JSON.stringify(segmentToSegmentMap));
  // TODO: Extract this block into a GenerateSegmentMap method, or something along those lines
  outputValues.split(' ')
    // Find the digit that this value uses
    .map(outputValue => { return { value: outputValue, digit: segmentCountToDigitMap[outputValue.length] } as DigitInfo })
    // Remove any digit that is not 1, 4, 7 or 8 (we can't determine the other digits by segment count)
    .filter(digitInfo => !!digitInfo.digit)
    // Find the segments that this digit would normally use
    .map(digitInfo => {
      digitInfo.normalSegments = digitToSegmentMap[digitInfo.digit as number]
      return digitInfo;
    })
    // For each of those normal segments, remove the segments that aren't being actived right now
    // from the segment map. This way we can find the mapping between normal segments and faulty segments
    .forEach(digitInfo => {
      digitInfo.value.split('').forEach(faultySegment => {
        entrySegmentMap[faultySegment as SegmentKey] = entrySegmentMap[faultySegment as SegmentKey].filter(segmentKey => digitInfo.normalSegments.includes(segmentKey));
      })
    })
  console.log(entrySegmentMap);
}
