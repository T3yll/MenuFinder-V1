import { cyberpunk } from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Active la gestion du mode dark via la classe 'dark'
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      scale: {
        '101': '1.01',
      },
      boxShadow: {
        custom: '1 0.5rem 1rem rgba(0, 0, 0, .15)',
      },
      height: {
        '48': '44px',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
        },
      },
      {
        retro: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#007bff",
          secondary: "#6c757d",
          warning: "#ffc107",
          error: "#dc2626",
          success: "#28a745",
          neutral: "#343A40",
          // accent: "#007bff",
        },
      },
      {
        cyberpunk: {
          ...require("daisyui/src/theming/themes")["cyberpunk"],
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
        },
      },
      {
        valley: {
          ...require("daisyui/src/theming/themes")["valentine"],
        },
      },
    ],
  },
}