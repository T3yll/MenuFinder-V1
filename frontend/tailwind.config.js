/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B", // Rouge-corail pour l'alimentation/appétit
        secondary: "#4ECDC4", // Turquoise-menthe pour la fraîcheur
        accent: "#FFD166", // Jaune pour attirer l'attention
        dark: "#292F36", // Gris foncé pour le texte
        light: "#F7FFF7", // Blanc cassé pour le fond
      },
    },
  },
  plugins: [],
}
