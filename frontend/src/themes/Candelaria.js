// Tema de La Candelaria. Datos puros: lo importa también vite.config.js
// (fondo inicial de index.html), así que nada de MUI ni del navegador.
//
// Azul institucional (heredero del #1976d2/#173753 de la web anterior y del
// azul de Gedure) y un dorado cálido de acento, el de la vela de la
// Candelaria. Los `main` cumplen 4.5:1 con su `contrastText`.

export const Candelaria = {
  label: "La Candelaria",
  light: {
    primary: { main: "#1B4F9C", dark: "#133A75", light: "#E8EFFA", contrastText: "#FFFFFF" },
    secondary: { main: "#9A5B00", dark: "#7A4800", light: "#FBF1E1", contrastText: "#FFFFFF" },
    background: { default: "#F7F8FB", paper: "#FFFFFF", appbar: "#FFFFFF" },
    text: { primary: "#1D2433", secondary: "#5A6475" },
    success: { main: "#1B8A54", dark: "#14663F", light: "#EEF6F1" },
    info: { main: "#1B4F9C", dark: "#133A75", light: "#E8EFFA" },
    warning: { main: "#B7791F", dark: "#7F5300", light: "#FDF6E3" },
    error: { main: "#C41826", dark: "#A3121F", light: "#FCEEEF" },
  },
  dark: {
    primary: { main: "#8DB4FF", dark: "#B9D0FF", light: "#16233D", contrastText: "#0E1420" },
    secondary: { main: "#F2B45A", dark: "#F7CD8C", light: "#2B2114", contrastText: "#0E1420" },
    background: { default: "#0E131C", paper: "#151C29", appbar: "#151C29" },
    text: { primary: "#EEF2F8", secondary: "#A7B0BF" },
    success: { main: "#33C97A", dark: "#7ED9A6", light: "#16261E" },
    info: { main: "#8DB4FF", dark: "#B9D0FF", light: "#16233D" },
    warning: { main: "#F0B44A", dark: "#F2C45A", light: "#2A2415" },
    error: { main: "#F0434F", dark: "#FF8B94", light: "#2D181B" },
  },
};
