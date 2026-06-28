import { cn } from "@/lib/utils";

/** Layered radial gradient mesh — the ambient page background glow. */
export function GradientMesh({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute -left-[10%] -top-[20%] h-[60vh] w-[60vh] rounded-full opacity-60 blur-[120px] motion-safe:animate-float"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.45), transparent 70%)" }}
      />
      <div
        className="absolute -right-[5%] top-[10%] h-[50vh] w-[50vh] rounded-full opacity-50 blur-[120px] motion-safe:animate-float"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.30), transparent 70%)",
          animationDelay: "-2s",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[30%] h-[55vh] w-[55vh] rounded-full opacity-40 blur-[130px] motion-safe:animate-float"
        style={{
          background: "radial-gradient(circle, rgba(217,70,239,0.28), transparent 70%)",
          animationDelay: "-4s",
        }}
      />
    </div>
  );
}
