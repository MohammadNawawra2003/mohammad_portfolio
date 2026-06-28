import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

/** Icon row for LinkedIn / GitHub / Email / etc. */
export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {profile.links.map((link) => {
        const Icon = link.icon;
        const external = link.href.startsWith("http");
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={link.label}
              data-cursor="Open"
              className={cn(
                "flex size-10 items-center justify-center rounded-md border border-[var(--border)] bg-surface text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-brand-400",
                iconClassName,
              )}
            >
              <Icon className="size-[18px]" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
