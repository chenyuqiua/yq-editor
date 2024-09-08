import { Player } from "@/component/editor/player/player";
import { cn } from "../../../../util/css";

interface Props {
  className?: string;
}

export function PlayerContainer({ className }: Props) {
  return (
    <div className={cn(className)}>
      <span className="pl-2 inline-block w-full h-10 mb-2 leading-10 border-b dark:border-gray-600 border-gray-300">
        播放器
      </span>
      <Player />
    </div>
  );
}
