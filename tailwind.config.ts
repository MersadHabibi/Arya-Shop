import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1500px"
      },
      maxWidth: {
        "screen-3xl": "1700px"
      }
    }
  },
  /** @satisfies {import("daisyui").Config} */
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#33449C",
        secondary: "#7C3996",
        "primary-content": "#fff",
        "success-content": "#fff",
        "error-content": "#fff",
        "base-content": "#000000",
        "base-100": "#FFFFFF",
        "base-200": "#EEEEEE",
        "base-300": "#878787",

        "--rounded-btn": "0.5rem",
      }
    }, "dark"],
    logs: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("daisyui")
  ],
};
export default config;
