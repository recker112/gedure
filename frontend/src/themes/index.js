import { Candelaria } from "./Candelaria.js";

// Única lista de temas: la usan useThemeConfig y el fondo inicial de
// index.html (vite.config.js), así que los temas son datos puros: sin
// imports de MUI ni del navegador, y con extensión `.js` en los imports.
const themes = {
  default: Candelaria,
};

export default themes;
