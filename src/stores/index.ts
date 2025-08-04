import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { createCounterSlice } from "./slices/counter-slice"
import { createTicTacToeSlice } from "./slices/tic-tac-toe-slice"
import { Store } from "./types"
import { STORAGE_KEY } from "@/constants/storage-key"

export const useStore = create<Store>()(
  immer(
    persist(
      (...args) => {
        const [set, , store] = args
        return {
          ...createCounterSlice(...args),
          ...createTicTacToeSlice(...args),
          resetAllSlices: () => set(store.getInitialState(), true),
        }
      },
      {
        name: STORAGE_KEY.ZUSTAND_STORAGE,
      },
    ),
  ),
)
