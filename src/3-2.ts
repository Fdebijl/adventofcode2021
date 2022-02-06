import { getInput, transpose } from './helpers';

type Bit = 0 | 1;

const bitsToInt = (bits: Bit[]): number => parseInt(bits.join(''), 2);

const getMostCommonBit = (bits: Bit[]): Bit => {
  let nill = 0, one = 0;
  bits.forEach(bit => (bit === 0 ? nill++ : one++))
  return one >= nill ? 1 : 0;
}

const getLeastCommonBit = (bits: Bit[]): Bit => {
  let nill = 0, one = 0;
  bits.forEach(bit => (bit === 0 ? nill++ : one++))
  return one < nill ? 1 : 0;
}

const input = getInput(3);
const bitRows = input.split('\n').map(line => line.split('').map(char => Number.parseInt(char) as Bit));
const bitColumns = transpose(bitRows);

let commonBitsPerPosition = bitColumns.map(bits => getMostCommonBit(bits));
let leastCommonBitsPerPosition = bitColumns.map(bits => getLeastCommonBit(bits));
let possibleOxygenValues = bitRows;
let oxygenBitValue;
let possibleCo2Values = bitRows;
let co2BitValue;

for (let index = 0; index < bitRows[0].length; index++) {
  const commonBitForThisPosition = commonBitsPerPosition[index];
  const leastCommonBitForThisPosition = leastCommonBitsPerPosition[index];

  possibleOxygenValues = possibleOxygenValues.filter(bits => bits[index] === commonBitForThisPosition);
  if (possibleOxygenValues.length === 1) {
    oxygenBitValue = possibleOxygenValues[0];
  } else if (possibleCo2Values.length > 0) {
    commonBitsPerPosition = transpose(possibleOxygenValues).map(bits => getMostCommonBit(bits));
  }

  possibleCo2Values = possibleCo2Values.filter(bits => bits[index] === leastCommonBitForThisPosition);
  if (possibleCo2Values.length === 1) {
    co2BitValue = possibleCo2Values[0];
  } else if (possibleCo2Values.length > 0) {
    leastCommonBitsPerPosition = transpose(possibleCo2Values).map(bits => getLeastCommonBit(bits));
  }

  if (oxygenBitValue && co2BitValue) {
    break;
  }
}

const oxygen = bitsToInt(oxygenBitValue as Bit[]);
const co2 = bitsToInt(co2BitValue as Bit[]);
console.log(oxygen * co2);