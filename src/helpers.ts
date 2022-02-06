import fs from 'fs';

/** Get the input for a given day */
export const getInput = (day: number): string => {
  return fs.readFileSync(`inputs/${day}`, 'utf-8');
}

/** Swap the row and columns of array, i.e. "rotate" the array 90 degrees */
export const transpose = <T>(matrix: T[][]): T[][] => {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

/** Cut an array into chunks of a specified size */
export const chunk = (array: string[], chunkSize = 5): string[][] => {
  const output = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    output.push(array.slice(i, i + chunkSize));
  }

  return output;
}