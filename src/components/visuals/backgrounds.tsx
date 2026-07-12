import { cn } from "@/lib/utils";

/** Engineering blueprint grid — fine + coarse lines, faded at edges. */
export function BlueprintGrid({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 mask-radial-faded", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px), linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "96px 96px, 96px 96px, 16px 16px, 16px 16px",
        }}
      />
    </div>
  );
}

/** Aurora ribbons — soft animated colour bands. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute -top-1/3 left-1/4 h-[70vh] w-[60vw] rotate-12 opacity-40 blur-[100px] motion-safe:animate-float"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, rgba(67, 56, 202,0.4), rgba(45, 212, 191,0.25), rgba(245, 158, 11,0.3), rgba(67, 56, 202,0.4))",
        }}
      />
    </div>
  );
}

/** Soft spotlight from the top. */
export function Spotlight({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        background:
          "radial-gradient(60% 50% at 50% -10%, var(--halo), transparent 70%)",
      }}
    />
  );
}

/** Diagonal wireframe overlay. */
export function Wireframe({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 mask-radial-faded", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, var(--grid-line) 0 1px, transparent 1px 22px)",
      }}
    />
  );
}
