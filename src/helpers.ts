import fs from 'fs';

export const getInput = (day: Number): string => {
  return fs.readFileSync(`inputs/${day}`, 'utf-8');
}