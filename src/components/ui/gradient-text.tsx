import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
}

/** Inline gradient text — reserved for one or two key phrases per section. */
export function GradientText({ className, as: Comp = "span", ...props }: GradientTextProps) {
  return <Comp className={cn("text-gradient", className)} {...props} />;
}
