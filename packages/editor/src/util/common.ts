import {
  PlayTargetTrackValue,
  TrackAttributeItemType,
  TrackType,
} from "@/store";
import { SizeType } from "@/type";

export function isVideo(type: string) {
  return type === TrackType.VIDEO;
}
export function isImage(type: string) {
  return type === TrackType.IMAGE;
}
export function isText(type: string) {
  return type === TrackType.TEXT;
}
export function computedItemShowArea(
  trackItem: PlayTargetTrackValue,
  canvasSize: SizeType,
  trackAttr: TrackAttributeItemType
) {
  const {
    left = 0,
    top = 0,
    scale = 100,
    text = "",
    fontSize = 16,
  } = trackAttr;
  const { width, height, type } = trackItem;
  const { width: playerWidth, height: playerHeight } = canvasSize;

  let defaultWidth = playerWidth;
  let defaultHeight = playerHeight;

  if (isVideo(type)) {
    const proportionalWidth = Math.floor((playerHeight / height) * width); // 等高宽度
    const proportionalHeight = Math.floor((playerWidth / width) * height); // 等宽高度

    // 默认渲染位置
    if (proportionalWidth > playerWidth) {
      // 等高场景下宽度溢出，则采用等宽， 高度上下留白
      defaultHeight = proportionalHeight;
    } else if (proportionalHeight > playerHeight) {
      // 等宽场景下高度溢出，则采用等高， 宽度左右留白
      defaultWidth = proportionalWidth;
    }
  }
  if (isImage(type)) {
    defaultWidth = width;
    defaultHeight = width;
  }
  if (isText(type)) {
    defaultWidth = text.length * fontSize;
    defaultHeight = fontSize * 1.2;
  }

  // 由默认位置计算偏移缩放位置
  const scaleW = Math.floor((defaultWidth * scale) / 100);
  const scaleH = Math.floor((defaultHeight * scale) / 100);
  const scaleL = Math.floor(left + (defaultWidth - scaleW) / 2);
  const scaleT = Math.floor(top + (defaultHeight - scaleH) / 2);
  const diffW = Math.floor(playerWidth - scaleW);
  const diffH = Math.floor(playerHeight - scaleH);
  return {
    drawL: scaleL,
    drawT: scaleT,
    drawW: scaleW,
    drawH: scaleH,
    sourceWidth: width,
    sourceHeight: height,
    defaultWidth,
    defaultHeight,
    diffW,
    diffH,
  };
}
