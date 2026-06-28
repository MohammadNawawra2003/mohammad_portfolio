import * as React from "react";
import { cn } from "@/lib/utils";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode;
}

/** Small labelled chip used for skills, tags, and tech badges. */
export function Pill({ className, icon, children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-surface px-3 py-1.5 text-sm text-text-muted",
        "transition-colors duration-200 hover:border-brand-500/40 hover:text-text",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
