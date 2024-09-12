import { z } from "zod";
import { TrackType } from "./constant";
import { text } from "stream/consumers";
// about playTargetTrackMap
export const playTargetTrackValueSchema = z.object({
  type: z.nativeEnum(TrackType),
  name: z.string(),
  format: z.string(),
  cover: z.string(),
  source: z.string(),
  width: z.number(),
  height: z.number(),
  fps: z.number(),
  frameCount: z.number(),
  time: z.string(),
  main: z.boolean(),
  id: z.string(),
  start: z.number(),
  end: z.number(),
  offsetL: z.number(),
  offsetR: z.number(),
  showWidth: z.string(),
  showLeft: z.string(),
});
export type PlayTargetTrackValue = z.infer<typeof playTargetTrackValueSchema>;
export type PlayTargetTrackMap = Map<number, PlayTargetTrackValue>;

// about trackAttributeMap
export const trackAttributeValueSchema = z.object({
  left: z.number().optional(),
  top: z.number().optional(),
  scale: z.number().optional(),
  silent: z.boolean().optional(),
  text: z.string().optional(),
  color: z.string().optional(),
  fontSize: z.number().optional(),
});
export type TrackAttributeItemType = z.infer<typeof trackAttributeValueSchema>;
export type TrackAttributeMap = Record<string, TrackAttributeItemType>;
