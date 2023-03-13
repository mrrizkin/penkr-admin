import { defineConfig } from "windicss/helpers";
import scrollSnap from "windicss/plugin/scroll-snap";
import scrollbar from "@windicss/plugin-scrollbar";

export default defineConfig({
  plugins: [scrollSnap, scrollbar],
  variants: {
    scrollbar: ["rounded"],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        serif: ["ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Oswald"],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Noto Sans",
          "Helvetica",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
    },
  },
});
