import { memo } from "react";
import { Resource } from "./resource";
import { VideoDraft } from "./video-draft";
import { TimeLine } from "./time-line";

export const EditorPage = memo(() => {
  return (
    <div className="h-screen flex bg-[#212936] text-white">
      <Resource />
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <VideoDraft />
        </div>
        <TimeLine />
      </div>
    </div>
  );
});
