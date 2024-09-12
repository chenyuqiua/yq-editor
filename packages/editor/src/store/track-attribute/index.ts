import { shallow } from "zustand/shallow";
import { trackAttributeSlice, TrackAttributeType } from "./slice";
import { createWithEqualityFn } from "zustand/traditional";

type StoreType = TrackAttributeType;
export const useTrackAttributeStore = createWithEqualityFn<StoreType>()(
  trackAttributeSlice,
  shallow
);
