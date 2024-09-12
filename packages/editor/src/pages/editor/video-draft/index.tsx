import { memo } from "react";
import { PlayerContainer } from "./container/container.player";
import { AttributeContainer } from "./container/container.attribute";

export const VideoDraft = memo(() => {
  return (
    <div className="flex h-full flex-nowrap flex-row">
      <PlayerContainer className="flex-1" />
      <AttributeContainer className="w-80" />
    </div>
  );
});
