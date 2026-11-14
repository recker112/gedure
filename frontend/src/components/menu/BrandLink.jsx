/**
 * React
 */
import { Link } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * Components
 */
import Crest from "../brand/Crest";
import { SCHOOL } from "../../school";

/** Escudo + nombre del colegio; enlaza al inicio. */
export default function BrandLink({ onClick }) {
  return (
    <Box
      component={Link}
      to="/"
      onClick={onClick}
      aria-label={`${SCHOOL.shortName}, ir al inicio`}
      sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "inherit", textDecoration: "none", minWidth: 0 }}
    >
      <Crest height={40} decorative />
      <Box sx={{ minWidth: 0 }}>
        <Typography
          component="span"
          sx={{ display: "block", fontWeight: 800, fontSize: 18, lineHeight: 1.1 }}
        >
          {SCHOOL.shortName}
        </Typography>
        <Typography component="span" variant="caption" color="textSecondary" sx={{ display: "block", lineHeight: 1.2 }}>
          {SCHOOL.city} · desde {SCHOOL.founded}
        </Typography>
      </Box>
    </Box>
  );
}
