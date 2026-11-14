/**
 * React
 */
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

/**
 * MUI
 */
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

/**
 * Tema
 */
import themes from "../../themes";
import { useThemeSelection } from "./useThemeSelection";
import { readLocal, STORAGE_PREFIX } from "../../components/utils/storage";
import { updateUserConfig } from "../../store/reducers/user/configReducer";

const HEADING_FONT = ["Lora", "Georgia", "serif"].join(",");
const BODY_FONT = [
  "system-ui",
  "-apple-system",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
].join(",");

/**
 * Tema de MUI de una variante y un modo (ya saneados).
 */
export const createAppTheme = (variant, mode) =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        ...themes[variant][mode],
      },
      shape: { borderRadius: 12 },
      typography: {
        fontFamily: BODY_FONT,
        h1: { fontFamily: HEADING_FONT, fontWeight: 700 },
        h2: { fontFamily: HEADING_FONT, fontWeight: 700 },
        h3: { fontFamily: HEADING_FONT, fontWeight: 700 },
        h4: { fontFamily: HEADING_FONT, fontWeight: 600 },
        h5: { fontFamily: HEADING_FONT, fontWeight: 600 },
        h6: { fontWeight: 600 },
        overline: { fontWeight: 700, letterSpacing: ".14em" },
      },
      components: {
        MuiPaper: {
          styleOverrides: { root: { backgroundImage: "none" } },
        },
        MuiButton: {
          defaultProps: { disableElevation: true },
          styleOverrides: {
            root: { borderRadius: 999, textTransform: "none", fontWeight: 600 },
          },
        },
        MuiCard: {
          defaultProps: { variant: "outlined" },
        },
        MuiLink: {
          defaultProps: { underline: "hover" },
        },
      },
    }),
  );

/**
 * El tema vive en Redux (userConfig). Este hook lo traduce a un tema de MUI
 * y refleja en Redux los cambios hechos en otras pestañas: el evento
 * `storage` no llega a la pestaña que escribió, así que no hay bucle.
 */
export const useThemeConfig = () => {
  const dispatch = useDispatch();
  const { mode, variant } = useThemeSelection();

  useEffect(() => {
    function onStorage(e) {
      // e.key === null: otra pestaña hizo localStorage.clear().
      if (e.key !== null && e.key !== `${STORAGE_PREFIX}userConfig.theme`) return;
      const value = readLocal("userConfig.theme", null);
      if (value) dispatch(updateUserConfig({ key: "theme", value, notSave: true }));
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [dispatch]);

  // Memoizado por semántica: el ThemeProvider necesita un tema con identidad
  // estable; un objeto nuevo en cada render re-estilaría toda la app.
  return useMemo(() => createAppTheme(variant, mode), [variant, mode]);
};
