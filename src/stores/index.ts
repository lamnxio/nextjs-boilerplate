import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createCounterSlice } from './slices/counter-slice'
import { Store } from './types'

export const useStore = create<Store>()(
  immer(
    persist(
      (...args) => {
        const [set, , store] = args
        return {
          ...createCounterSlice(...args),
          resetAllSlices: () => set(store.getInitialState(), true),
        }
      },
      {
        name: 'zustand-storage',
      },
    ),
  ),
)
