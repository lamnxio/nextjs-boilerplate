import type { StateCreator } from 'zustand'
import { CounterSlice } from './slices/counter-slice'
import { TicTacToeSlice } from './slices/tic-tac-toe-slice'

export type Store = CounterSlice &
  TicTacToeSlice & {
    resetAllSlices: () => void
  }

export type StateSlice<T> = StateCreator<Store, [['zustand/persist', unknown], ['zustand/immer', never]], [], T>
