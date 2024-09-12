import {
  PlayTargetTrackValue,
  usePlayerStore,
  useTrackAttributeStore,
} from "@/store";
import { SizeType } from "@/type";
import { computedItemShowArea, isVideo } from "@/util/common";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

interface Props {
  size: SizeType;
}

const defaultStyle = {
  textBaseline: "middle" as const,
  textAlign: "center" as const,
  backgroundColor: "red",
};

export const CanvasPlayer = memo(({ size }: Props) => {
  const [canvasSize] = useState({
    width: 0,
    height: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContent] =
    useState<CanvasRenderingContext2D | null>(null);
  const renderPlayer: HTMLCanvasElement = document.createElement("canvas"); // 预渲染播放器 草稿
  const renderContext = useMemo(
    () => renderPlayer.getContext("2d"),
    [renderPlayer]
  );

  const [playTargetTrackMap, playStartFrame] = usePlayerStore((s) => [
    s.playTargetTrackMap,
    s.playStartFrame,
  ]);
  const [trackAttributeMap] = useTrackAttributeStore((s) => [
    s.trackAttributeMap,
  ]);

  useEffect(() => {
    initContent();
  }, []);

  useEffect(() => {
    drawCanvas();
  }, [playTargetTrackMap, trackAttributeMap, canvasSize]);

  function initContent() {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = size.width;
      canvas.height = size.height;
      const canvasContext = canvasRef.current.getContext("2d");
      setCanvasContent(canvasContext);
    }
  }

  async function drawCanvas() {
    const videoList: Array<any> = [];
    const otherList: Array<any> = [];
    playTargetTrackMap.forEach((item, id) => {
      if (trackAttributeMap[id]) {
        const { type } = item;
        if (isVideo(type)) {
          videoList.push(() => drawToRenderCanvas(item, id, playStartFrame));
        } else {
          otherList.unshift(() => drawToRenderCanvas(item, id, playStartFrame));
        }
      }
    });
    clearCanvas();
    await videoList.reduce(
      (prev, next) => prev.then(() => next()),
      Promise.resolve()
    );
    await otherList.reduce(
      (prev, next) => prev.then(() => next()),
      Promise.resolve()
    );
    drawToPlayerCanvas();
  }

  function drawToRenderCanvas(
    trackItem: PlayTargetTrackValue,
    id: number,
    frameIndex: number
  ) {
    return new Promise((resolve) => {
      // const { sourceWidth, sourceHeight, drawL, drawT, drawW, drawH } =
      //   computedRect(trackItem, id);
      // const { type, start, end, offsetL, name, sourceFrame } = trackItem;
      const { type, end } = trackItem;
      if (frameIndex > end) {
        return resolve(true);
      } else if (isVideo(type)) {
        // TODO: draw video
      }
    });
  }
  function drawToPlayerCanvas() {
    return new Promise((resolve) => {
      canvasContext?.drawImage(
        renderPlayer,
        0,
        0,
        canvasSize.width,
        canvasSize.height,
        0,
        0,
        canvasSize.width,
        canvasSize.height
      );
      resolve(true);
    });
  }

  function clearCanvas() {
    if (renderContext) {
      renderContext.fillStyle = defaultStyle.backgroundColor;
      renderContext.fillRect(0, 0, size.width, size.height);
    }
  }

  // 计算渲染区域位置信息
  function computedRect(trackItem: PlayTargetTrackValue, id: number) {
    return computedItemShowArea(trackItem, canvasSize, trackAttributeMap[id]);
  }

  return (
    <div>
      CanvasPlayer
      <canvas ref={canvasRef} />
    </div>
  );
});
