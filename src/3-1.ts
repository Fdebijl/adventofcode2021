import { getInput, transpose } from './helpers';

type Bit = 0 | 1;

const getMostCommonBit = (bits: Bit[]): Bit => {
  let nill = 0, one = 0;
  bits.forEach(bit => (bit === 0 ? nill++ : one++))
  return nill > one ? 1 : 0;
}

const getLeastCommonBit = (bits: Bit[]): Bit => {
  return getMostCommonBit(bits) ? 0 : 1;
}

const input = getInput(3);
const bitMatrix = input.split('\n').map(line => line.split('').map(char => Number.parseInt(char) as Bit));
const flippedMatrix = transpose(bitMatrix);
const gamma = parseInt(flippedMatrix.map(bits => getMostCommonBit(bits)).join(''), 2);
const epsilon = parseInt(flippedMatrix.map(bits => getLeastCommonBit(bits)).join(''), 2);
console.log(gamma * epsilon);
