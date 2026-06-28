"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyChipProps {
  label: string;
  value: string;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
}

/** Contact detail row with copy-to-clipboard. */
export function CopyChip({ label, value, href, icon, className }: CopyChipProps) {
  const [copied, setCopied] = useState(false);

  async function copy(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the link still works */
    }
  }

  const content = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-500/10 text-brand-400">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-xs text-text-faint">{label}</span>
        <span className="truncate text-sm font-medium text-text">{value}</span>
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="ml-auto flex size-8 shrink-0 items-center justify-center rounded-md text-text-faint transition-colors hover:bg-surface hover:text-text"
      >
        {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
      </button>
    </>
  );

  const base = cn(
    "group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-surface px-3 py-2.5 transition-colors hover:border-brand-500/40",
    className,
  );

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={base}>
      {content}
    </a>
  ) : (
    <div className={base}>{content}</div>
  );
}
