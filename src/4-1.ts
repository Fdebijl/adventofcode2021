import { chunk, getInput, transpose } from './helpers';

type Board = number[][];

const determineWinConditions = (drawnNumbers: number[], boards: Board[]): { numbersDrawnSoFar: number[], winningBoard: Board, winningNumber: number } => {
  for (let i = 1; i <= drawnNumbers.length; i++) {
    const numbersDrawnSoFar = drawnNumbers.slice(0, i);

    const winningBoard = boards.find(board => {
      return board.some(row => row.every(number => numbersDrawnSoFar.includes(number))
      || transpose(board).some(column => column.every(number => numbersDrawnSoFar.includes(number))))
    });

    if (winningBoard) return { numbersDrawnSoFar, winningBoard, winningNumber: drawnNumbers[i - 1] }
  }

  throw new Error('No winning board');
}

const input = getInput(4).split('\n').filter(line => line.length > 0);
const drawnNumbers = (input.shift() as string).split(',').map(char => parseInt(char));
const boards = chunk(input).map(board => board.map(row => row.split(' ').filter(Boolean).map(Number)));
const { numbersDrawnSoFar, winningBoard, winningNumber } = determineWinConditions(drawnNumbers, boards);
const total = winningBoard.flat(2).filter(number => !numbersDrawnSoFar.includes(number)).reduce((a, b) => a + b) * winningNumber;

console.log(total);