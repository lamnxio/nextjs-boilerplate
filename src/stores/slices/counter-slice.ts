import { StateSlice } from '../types'

export interface CounterSlice {
  count: number
  increase: () => void
  decrease: () => void
  resetCounter: () => void
}

export const createCounterSlice: StateSlice<CounterSlice> = (set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  resetCounter: () => set({ count: 0 }),
})
