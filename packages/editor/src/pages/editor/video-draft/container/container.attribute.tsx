import { cn } from "@/util/css";

interface Props {
  className?: string;
}

export function AttributeContainer({ className }: Props) {
  return <div className={cn(className)}>Attribute</div>;
}
