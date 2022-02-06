import { getInput } from './helpers';

type Command = 'up' | 'forward' | 'down';

interface Instructions {
  command: Command;
  steps: number;
}

const input = getInput(2);
const instructions: Instructions[] = input.split('\n').map(line => {
  return {
    command: line.split(' ')[0] as Command,
    steps: Number.parseInt(line.split(' ')[1])
  }
});

let x = 0, y = 0;
for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];

  switch (instruction.command) {
    case 'down': {
      x = x + instruction.steps;
      break;
    }
    case 'up': {
      x = x - instruction.steps;
      break;
    }
    case 'forward': {
      y = y + instruction.steps;
      break;
    }
  }
}

console.log(x * y);