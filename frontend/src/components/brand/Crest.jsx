/**
 * MUI
 */
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

/**
 * Assets
 */
import crestDark from "../../assets/img/escudo.webp";
import crestLight from "../../assets/img/escudo-blanco.webp";

/**
 * Escudo del colegio (U.E.P. A.P.E.P. La Candelaria, Turmero 1984). Es de
 * línea sobre transparente: en oscuro (o sobre fondos oscuros, `inverted`)
 * se usa la versión blanca.
 */
export default function Crest({ height = 48, inverted = false, decorative = false, sx }) {
  const theme = useTheme();
  const white = inverted || theme.palette.mode === "dark";

  return (
    <Box
      component="img"
      src={white ? crestLight : crestDark}
      alt={decorative ? "" : "Escudo de la U.E.P. A.P.E.P. La Candelaria"}
      width={Math.round(height * 0.82)}
      height={height}
      sx={{ display: "block", objectFit: "contain", ...sx }}
    />
  );
}
