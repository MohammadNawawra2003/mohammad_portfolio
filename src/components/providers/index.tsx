"use client";

import { ThemeProvider } from "./theme-provider";
import { LenisProvider } from "./lenis-provider";

/** Top-level client providers wrapper. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LenisProvider>{children}</LenisProvider>
    </ThemeProvider>
  );
}
