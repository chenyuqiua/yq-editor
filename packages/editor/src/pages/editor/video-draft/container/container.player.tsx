import React, { memo, useState } from "react";
import { Player } from "@/component/editor/player/player";
import { cn } from "../../../../util/css";
import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

export const PlayerContainer = memo(({ className }: Props) => {
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateStageSize();
    window.addEventListener("resize", updateStageSize);

    return () => {
      window.removeEventListener("resize", updateStageSize);
    };
  }, []);

  function updateStageSize() {
    if (!ref.current) return { width: 0, height: 0 };

    const { width, height } = ref.current.getBoundingClientRect();
    setStageSize({ width, height });
  }

  // TODO: 当time-line高度变化时，需要重新计算stageSize

  // TODO: 当视频元素的最大宽高发生变化时, 需要重新计算stageSize

  return (
    <div className={cn("relative flex flex-col gap-2", className)} ref={ref}>
      <span className="pl-2 w-full h-10 leading-10 border-b dark:border-gray-600 border-gray-300">
        播放器
      </span>
      <div className="relative flex-1 w-full p-2 box-border mb-10">
        <Player size={stageSize} className="bg-black" />
      </div>
    </div>
  );
});
