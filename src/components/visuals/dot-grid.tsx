import { cn } from "@/lib/utils";

/** Faded engineering dot-grid backdrop. */
export function DotGrid({ className, variant = "dot" }: { className?: string; variant?: "dot" | "line" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 mask-radial-faded",
        variant === "dot" ? "bg-dot-grid" : "bg-line-grid",
        className,
      )}
    />
  );
}
