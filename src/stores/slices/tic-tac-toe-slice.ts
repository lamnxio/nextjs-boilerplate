import { StateSlice } from '../types'

type Player = 'X' | 'O'
type Cell = Player | null
type Board = Cell[]

export interface TicTacToeSlice {
  ticTacToe: {
    board: Board
    currentPlayer: Player
    winner: Player | null
    isGameOver: boolean
    isDraw: boolean
    gamesPlayed: number
    xWins: number
    oWins: number
    draws: number
  }
  makeMove: (index: number) => void
  resetGame: () => void
  resetStats: () => void
}

const initialBoard: Board = Array(9).fill(null)

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
] as const

const checkWinner = (board: Board): Player | null => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player
    }
  }
  return null
}

const checkDraw = (board: Board): boolean => {
  return board.every((cell) => cell !== null)
}

export const createTicTacToeSlice: StateSlice<TicTacToeSlice> = (set, get) => ({
  ticTacToe: {
    board: initialBoard,
    currentPlayer: 'X',
    winner: null,
    isGameOver: false,
    isDraw: false,
    gamesPlayed: 0,
    xWins: 0,
    oWins: 0,
    draws: 0,
  },

  makeMove: (index: number) => {
    const { ticTacToe } = get()
    const { board, currentPlayer, isGameOver } = ticTacToe

    if (isGameOver || board[index] !== null) {
      return
    }

    const newBoard = [...board]
    newBoard[index] = currentPlayer

    const winner = checkWinner(newBoard)
    const isDraw = !winner && checkDraw(newBoard)
    const gameOver = winner !== null || isDraw

    set((state) => ({
      ticTacToe: {
        ...state.ticTacToe,
        board: newBoard,
        currentPlayer: gameOver ? currentPlayer : currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isGameOver: gameOver,
        isDraw,
        gamesPlayed: gameOver ? state.ticTacToe.gamesPlayed + 1 : state.ticTacToe.gamesPlayed,
        xWins: winner === 'X' ? state.ticTacToe.xWins + 1 : state.ticTacToe.xWins,
        oWins: winner === 'O' ? state.ticTacToe.oWins + 1 : state.ticTacToe.oWins,
        draws: isDraw ? state.ticTacToe.draws + 1 : state.ticTacToe.draws,
      },
    }))
  },

  resetGame: () => {
    set((state) => ({
      ticTacToe: {
        ...state.ticTacToe,
        board: initialBoard,
        currentPlayer: 'X',
        winner: null,
        isGameOver: false,
        isDraw: false,
      },
    }))
  },

  resetStats: () => {
    set((state) => ({
      ticTacToe: {
        ...state.ticTacToe,
        gamesPlayed: 0,
        xWins: 0,
        oWins: 0,
        draws: 0,
      },
    }))
  },
})
