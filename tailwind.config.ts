import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        input: "var(--input)",
        ring: "var(--ring)",
        placeholder: "var(--placeholder)",
        border: {
          "100": "var(--border-100)",
          DEFAULT: "var(--border)",
          variant: "var(--border-variant)",
        },
        background: {
          "100": "var(--background-100)",
          DEFAULT: "var(--background)",
          skeleton: "var(--skeleton)",
        },
        foreground: {
          "100": "var(--foreground-100)",
          DEFAULT: "var(--foreground)",
          variant: "var(--foreground-variant)",
        },
        secondary: {
          "100": "var(--secondary-100)",
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
        },
        grey: {
          DEFAULT: "var(--grey)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        inter: ["Inter", "Arial", "sans-serif"],
        sora: ["Sora", "Arial", "sans-serif"],
      },
      fontSize: {
        sm: "0.8rem",
        base: "0.84rem",
        subtitle: ["clamp(0.9rem, 3vw, 0.95rem)", { lineHeight: "1.2" }],
        secondaryFont: ["clamp(1.2rem, 3vw, 28px) ", { lineHeight: "1.3" }],
        primaryFont: ["clamp(2rem, 5vw, 32px)", { lineHeight: "1.3" }],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        ".clip-circle ": {
          clipPath: "circle()",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
} satisfies Config;

export default config;
