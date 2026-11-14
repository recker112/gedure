/**
 * React Router
 */
import { Link as RouterLink, useLocation } from "react-router-dom";

/**
 * MUI
 */
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

/**
 * Components
 */
import { useMockRole } from "../../../hooks/app/useMockRole";
import { NAV_BADGES } from "../../../mocks/mockData";
import { findPanelItem, itemTitle, navForRole } from "./panelNav";

/**
 * Navegación del cajón: bloques de panelNav.js filtrados por la vista de rol
 * (en BluLabel, RenderNavigator + NavItem filtrando con useCanAccess). Son
 * enlaces de verdad (`<a>`), con `aria-current` en la sección activa.
 */
export default function PanelNavList({ onNavigate }) {
  const { role } = useMockRole();
  const { pathname } = useLocation();
  const active = findPanelItem(pathname);
  const badges = NAV_BADGES[role] ?? {};

  return (
    <nav aria-label="Gedure">
      {navForRole(role).map(({ group, items }, index) => (
        <List
          key={group ?? `bloque-${index}`}
          disablePadding
          sx={{ mb: 1 }}
          subheader={
            group ? (
              <ListSubheader disableSticky sx={{ bgcolor: "transparent", lineHeight: "32px", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>
                {group}
              </ListSubheader>
            ) : undefined
          }
        >
          {items.map((item) => {
            const Icon = item.icon;
            const selected = active?.to === item.to;
            const badge = item.badge && badges[item.badge];
            return (
              <ListItemButton
                key={item.to}
                component={RouterLink}
                to={item.to}
                selected={selected}
                aria-current={selected ? "page" : undefined}
                onClick={onNavigate}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.25,
                  minHeight: 46,
                  "&.Mui-selected": { bgcolor: "primary.light", color: "primary.main", "& .MuiListItemIcon-root": { color: "primary.main" } },
                  "&.Mui-selected .MuiListItemText-primary": { fontWeight: 700 },
                }}
              >
                <ListItemIcon sx={{ minWidth: 38 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={itemTitle(item, role)} />
                {badge ? <Chip label={badge} size="small" color="secondary" aria-label={`${badge} pendientes`} sx={{ height: 20, fontWeight: 700 }} /> : null}
              </ListItemButton>
            );
          })}
        </List>
      ))}
    </nav>
  );
}
