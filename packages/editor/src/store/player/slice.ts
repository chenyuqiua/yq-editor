import { StateCreator } from "zustand";
import type { PlayTargetTrackMap } from "../type";

export interface PlayerSliceType {
  playTargetTrackMap: PlayTargetTrackMap;
  playStartFrame: number;
}

export const playerSlice: StateCreator<
  PlayerSliceType,
  [],
  [],
  PlayerSliceType
> = (set, get) => ({
  playTargetTrackMap: new Map(), // 当前正确播放的元素的集合
  playStartFrame: 0, // 当前播放帧
});
