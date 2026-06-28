"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: React.ReactNode[];
  /** Animation duration in seconds. */
  speed?: number;
  className?: string;
  itemClassName?: string;
}

/**
 * Infinite, pause-on-hover marquee. Renders the track twice for a seamless
 * loop; respects reduced motion via the CSS animation (paused, static).
 */
export function Marquee({ items, speed = 36, className, itemClassName }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex shrink-0 items-center gap-10 pr-10 motion-safe:animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((item, i) => (
          <div key={i} className={cn("flex shrink-0 items-center", itemClassName)} aria-hidden={i >= items.length}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
