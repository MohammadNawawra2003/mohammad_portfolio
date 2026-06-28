import { Download } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type ResumeButtonProps = Omit<ButtonProps, "asChild" | "children"> & {
  label?: string;
};

/** Download the CV PDF. */
export function ResumeButton({ label = "Download CV", className, ...props }: ResumeButtonProps) {
  return (
    <Button asChild variant="secondary" className={cn(className)} {...props}>
      <a href={profile.resumeUrl} download data-cursor="Download">
        <Download aria-hidden />
        {label}
      </a>
    </Button>
  );
}
