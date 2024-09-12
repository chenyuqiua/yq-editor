import { shallow } from "zustand/shallow";
import { playerSlice, PlayerSliceType } from "./slice";
import { createWithEqualityFn } from "zustand/traditional";

type StoreType = PlayerSliceType;
export const usePlayerStore = createWithEqualityFn<StoreType>()(
  playerSlice,
  shallow
);
