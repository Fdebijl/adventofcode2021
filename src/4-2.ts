import { chunk, getInput, transpose } from './helpers';

type Board = number[][];

const boardHasWon = (board: Board, numbersDrawnSoFar: number[]) => {
  return board.some(row => row.every(number => numbersDrawnSoFar.includes(number))
  || transpose(board).some(column => column.every(number => numbersDrawnSoFar.includes(number))))
}

const determineLossConditions = (drawnNumbers: number[], boards: Board[]): { numbersDrawnSoFar: number[], losingBoard: Board, losingNumber: number } => {
  for (let i = 1; i <= drawnNumbers.length; i++) {
    const numbersDrawnSoFar = drawnNumbers.slice(0, i);

    if (boards.length === 1 && boardHasWon(boards[0], numbersDrawnSoFar)) {
      return { numbersDrawnSoFar, losingBoard: boards[0], losingNumber: drawnNumbers[i - 1] }
    } else {
      boards = boards.filter(board => !boardHasWon(board, numbersDrawnSoFar));
    }
  }

  throw new Error('No losing board');
}

const input = getInput(4).split('\n').filter(line => line.length > 0);
const drawnNumbers = (input.shift() as string).split(',').map(char => parseInt(char));
const boards = chunk(input).map(board => board.map(row => row.split(' ').filter(Boolean).map(Number)));
const { numbersDrawnSoFar, losingBoard, losingNumber } = determineLossConditions(drawnNumbers, boards);
const total = losingBoard.flat(2).filter(number => !numbersDrawnSoFar.includes(number)).reduce((a, b) => a + b) * losingNumber;

console.log(total);