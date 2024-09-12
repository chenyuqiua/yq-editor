import { memo } from "react";
import { cn } from "@/util/css";

interface Props {
  className?: string;
}

export const AttributeContainer = memo(({ className }: Props) => {
  return <div className={cn(className)}>Attribute</div>;
});
