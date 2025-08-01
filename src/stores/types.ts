import type { StateCreator } from 'zustand'
import { CounterSlice } from './slices/counter-slice'

export type Store = CounterSlice & {
  resetAllSlices: () => void
}

export type StateSlice<T> = StateCreator<Store, [['zustand/persist', unknown], ['zustand/immer', never]], [], T>
