/**
 * React Router
 */
import { Link as RouterLink, useLocation } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

/**
 * Components
 */
import useTitleHook from "../../../hooks/utils/useTitleHook";
import { useMockRole } from "../../../hooks/app/useMockRole";
import { PANEL_ROOT, findPanelItem, itemTitle } from "../../menu/panel/panelNav";

/**
 * Cabecera común de las secciones del panel: migas cortas (Inicio ›
 * sección, derivadas de panelNav.js), h1, entradilla y acciones a la derecha.
 * `crumbs` añade niveles extra (p. ej. el detalle de un registro) y
 * `docTitle` cambia el título de la pestaña (por defecto, `title`).
 */
export default function PanelPage({ title, docTitle, description, actions, crumbs = [], children }) {
  const { pathname } = useLocation();
  const { role } = useMockRole();
  const item = findPanelItem(pathname);
  useTitleHook(docTitle ?? title);

  const isHome = item?.to === PANEL_ROOT;
  const sectionTitle = itemTitle(item, role);

  return (
    <Stack spacing={3}>
      <Box component="header">
        {!isHome && (
          <Breadcrumbs aria-label="Migas de pan" separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 1, fontSize: 14 }}>
            <Link component={RouterLink} to={PANEL_ROOT} underline="hover" color="inherit">
              Inicio
            </Link>
            {crumbs.length > 0 ? (
              <Link component={RouterLink} to={item.to} underline="hover" color="inherit">
                {sectionTitle}
              </Link>
            ) : (
              <Typography sx={{ fontSize: "inherit" }} color="textPrimary" aria-current="page">
                {sectionTitle ?? title}
              </Typography>
            )}
            {crumbs.map((crumb, i) => (
              <Typography key={crumb} noWrap sx={{ fontSize: "inherit", maxWidth: { xs: 160, sm: 360 } }} color="textPrimary" aria-current={i === crumbs.length - 1 ? "page" : undefined}>
                {crumb}
              </Typography>
            ))}
          </Breadcrumbs>
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { sm: "flex-end" }, justifyContent: "space-between" }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h4" component="h1" sx={{ fontSize: { xs: 26, md: 32 } }}>
              {title}
            </Typography>
            {description && (
              <Typography color="textSecondary" sx={{ mt: 0.5, maxWidth: 760 }}>
                {description}
              </Typography>
            )}
          </Box>
          {actions && (
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", flexShrink: 0 }}>
              {actions}
            </Stack>
          )}
        </Stack>
      </Box>
      {children}
    </Stack>
  );
}
