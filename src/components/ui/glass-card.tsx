import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds the inset top-edge highlight. */
  edge?: boolean;
  /** Enables the shared hover-lift transition. */
  interactive?: boolean;
  as?: React.ElementType;
}

/** Frosted translucent surface — the project's signature container. */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, edge = true, interactive = false, as: Comp = "div", ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(
          "glass spot-card relative rounded-xl shadow-md",
          edge && "glass-edge",
          interactive && "hover-lift hover:shadow-lg",
          className,
        )}
        {...props}
      />
    );
  },
);
GlassCard.displayName = "GlassCard";
