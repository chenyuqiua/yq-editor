import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { PlayTargetTrackMap } from "../type";

const initialState = {
  playTargetTrackMap: new Map() as PlayTargetTrackMap, // 当前正确播放的元素的集合
  playStartFrame: 0, // 当前播放帧
};

export const usePlayerStore = createWithEqualityFn(
  devtools(immer(combine(initialState, (set, get) => ({})))),
  shallow
);
