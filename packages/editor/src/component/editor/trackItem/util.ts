import { RefObject } from "react";

/**
 * @description 抽帧函数
 */
export const drawVideoFrame = async (
  video: HTMLVideoElement,
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  if (video.readyState === 0) {
    await new Promise((resolve) => {
      video.onloadeddata = resolve;
    });
  }

  const { videoWidth, videoHeight } = video;
  const canvas = canvasRef.current;

  if (canvas) {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    const drawHeight = height;
    const drawWidth = (videoWidth / videoHeight) * drawHeight;
    const repeats = Math.ceil(width / drawWidth);
    const ctx = canvas.getContext("2d", { alpha: false });

    video.currentTime = 0;

    for (let i = 0; i < repeats; i++) {
      ctx?.drawImage(video, i * drawWidth, 0, drawWidth, drawHeight);
    }

    for (let i = 0; i < repeats; i++) {
      const time = i * (video.duration / repeats);
      video.currentTime = time;

      if (video.readyState !== 4) {
        await video.play();
      }
      ctx?.drawImage(video, i * drawWidth, 0, drawWidth, drawHeight);
    }
  }
};
