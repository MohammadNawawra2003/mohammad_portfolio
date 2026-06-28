import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "clamp(1.25rem, 5vw, 2.5rem)",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        border: "var(--border)",
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          faint: "var(--text-faint)",
        },
        brand: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
        },
        accent: {
          cyan: "#22D3EE",
          fuchsia: "#D946EF",
        },
        odoo: "#714B67",
        success: "#34D399",
        warning: "#FBBF24",
        danger: "#F87171",
        info: "#60A5FA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        h1: ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h3: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "20px",
        xl: "28px",
        "2xl": "36px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(10,10,15,.06)",
        md: "0 8px 24px -8px rgba(10,10,15,.25)",
        lg: "0 24px 60px -16px rgba(10,10,15,.45)",
        glow: "0 0 40px -8px rgba(124,58,237,.45)",
        "glow-lg": "0 0 80px -12px rgba(124,58,237,.55)",
        "inset-glass": "inset 0 1px 0 rgba(255,255,255,.08)",
      },
      maxWidth: {
        container: "1200px",
        prose: "65ch",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #22D3EE 100%)",
        "gradient-field": "linear-gradient(90deg,#3B0764,#7C3AED,#22D3EE)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        marquee: "marquee 36s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
