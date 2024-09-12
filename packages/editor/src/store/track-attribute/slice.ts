import { localStorageJsonGet, LocalStorageKeyEnum } from "@/util/local-storage";
import { StateCreator } from "zustand";
import type { TrackAttributeMap } from "../type";

export interface TrackAttributeType {
  trackAttributeMap: TrackAttributeMap;
}

export const trackAttributeSlice: StateCreator<
  TrackAttributeType,
  [],
  [],
  TrackAttributeType
> = (set, get) => ({
  trackAttributeMap:
    localStorageJsonGet(LocalStorageKeyEnum.TrackAttribute) ?? {}, // 轨道上所有元素的集合 value记录着元素的属性
});
