import { localStorageJsonGet, LocalStorageKeyEnum } from "@/util/local-storage";
import type { TrackAttributeMap } from "../type";
import { createWithEqualityFn } from "zustand/traditional";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";

const initialState = {
  trackAttributeMap: (localStorageJsonGet(LocalStorageKeyEnum.TrackAttribute) ??
    {}) as TrackAttributeMap, // 轨道上所有元素的集合 value记录着元素的属性
};

export const useTrackAttributeStore = createWithEqualityFn(
  devtools(immer(combine(initialState, (set, get) => ({})))),
  shallow
);
