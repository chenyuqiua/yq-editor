import { Resource } from "./resource";
import { VideoDraft } from "./video-draft";
import { TimeLine } from "./time-line";

export function EditorPage() {
  return (
    <div className="h-screen flex">
      <Resource />
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <VideoDraft />
        </div>
        <TimeLine />
      </div>
    </div>
  );
}
