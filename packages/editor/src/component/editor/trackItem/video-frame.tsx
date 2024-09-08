import React, { useEffect } from "react";
import { drawVideoFrame } from "./util";
import { cn } from "../../../util/css";

interface Props {
  url?: string;
  className?: string;
}

export function VideoFrame({
  url = "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4",
  className,
}: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  function createVideoElement(url: string) {
    const video = document.createElement("video");
    video.muted = true;
    video.autoplay = false;
    video.loop = false;
    video.style.width = "1px";
    video.style.height = "1px";
    video.controls = false;
    video.src = url;
    video.setAttribute("playsinline", "");
    return video;
  }

  useEffect(() => {
    drawVideoFrame(createVideoElement(url), canvasRef);
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className={cn("w-[800px] h-10", className)}
      ></canvas>
    </div>
  );
}
