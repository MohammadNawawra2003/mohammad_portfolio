import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Clamp a number to the [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation between a and b. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** The current year, for the footer copyright. */
export function currentYear(): number {
  return new Date().getFullYear();
}

/** Prefix a root-relative path with the deploy base path (for sub-path hosting). */
export function withBasePath(path: string): string {
  const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${bp}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute URL helper for canonical / OG metadata. */
export function absoluteUrl(path = ""): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohammadalnawawreh.com";
  return `${base.replace(/\/$/, "")}${withBasePath(path)}`;
}
