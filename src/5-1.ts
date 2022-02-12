import { getInput } from "./helpers";

type Vector = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

const getStep = (from: number, to: number) => {
  if (from === to) return 0;
  return to - from > 0 ? 1 : -1
}

const inputToVectors = (input: string[], orthogonalOnly: boolean): Vector[] => {
  let output = input.map(vector => {
    const [ from, to ] = vector.split('->');
    return {
      x1: parseInt(from.split(',')[0]),
      x2: parseInt(to.split(',')[0]),
      y1: parseInt(from.split(',')[1]),
      y2: parseInt(to.split(',')[1])
    }
  })

  if (orthogonalOnly) {
    output = output.filter(vector => vector.x1 === vector.x2 || vector.y1 === vector.y2);
  }

  return output;
}

const input = getInput(5).split('\n');
const vectors = inputToVectors(input, true);
const yMax = Math.max(...vectors.map(vector => [vector.y1, vector.y2]).flat(2)) + 1;
const xMax = Math.max(...vectors.map(vector => [vector.x1, vector.x2]).flat(2)) + 1;
const grid: number[][] = new Array(xMax).fill(new Array(yMax).fill(0));

for (const vector of vectors) {
  let x = vector.x1;
  let y = vector.y1;
  const xStep = getStep(vector.x1, vector.x2);
  const yStep = getStep(vector.y1, vector.y2);

  while (!(x === vector.x2 && y === vector.y2)) {
    grid[y][x]++;
    y += yStep;
    x += xStep;
  }
}

debugger;

const intersections = grid.flat(2).filter(number => number > 1).length;
console.log(intersections);
