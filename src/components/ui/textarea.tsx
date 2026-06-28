import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[140px] w-full resize-y rounded-md border border-[var(--border)] bg-bg-elev/60 px-4 py-3 text-sm text-text shadow-sm transition-colors",
        "placeholder:text-text-faint",
        "focus-visible:border-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
        "aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
