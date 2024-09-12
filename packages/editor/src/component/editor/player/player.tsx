import { cn } from "@/util/css";
import { CanvasPlayer } from "./canvas-player";
import { SizeType } from "@/type";

interface Props {
  size: SizeType;
  className?: string;
}

export function Player({ size, className }: Props) {
  return (
    <div className={cn("absolute left-0 right-0 bottom-0 top-0", className)}>
      <CanvasPlayer size={size} />
    </div>
  );
}
