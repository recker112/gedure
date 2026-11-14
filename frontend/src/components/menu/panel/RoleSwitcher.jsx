/**
 * React Router
 */
import { useLocation, useNavigate } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

/**
 * Components
 */
import { useMockRole } from "../../../hooks/app/useMockRole";
import { ROLES, ROLE_KEYS } from "../../../context/mockRole/roles";
import { PANEL_ROOT, canSeeItem, findPanelItem } from "./panelNav";

/**
 * MAQUETA. Selector de la vista de rol (al final del menú, discreto): cambia
 * el menú y el inicio para ver cómo lo verá cada perfil. No existe en la app
 * real (el rol lo dan los permisos del backend). Si la sección actual no es
 * de la nueva vista, vuelve al inicio.
 */
export default function RoleSwitcher() {
  const { role, setRole } = useMockRole();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (_, next) => {
    if (!next) return;
    setRole(next);
    if (!canSeeItem(findPanelItem(pathname), next)) navigate(PANEL_ROOT);
  };

  return (
    <Box sx={{ p: 1.25, borderRadius: 2, border: "1px dashed", borderColor: "divider" }}>
      <Typography id="role-switcher-label" variant="caption" color="textSecondary" component="p" sx={{ mb: 0.75, fontWeight: 600 }}>
        Vista de rol · Maqueta
      </Typography>
      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={handleChange}
        size="small"
        fullWidth
        aria-labelledby="role-switcher-label"
        sx={{ "& .MuiToggleButton-root": { textTransform: "none", px: 0.5, py: 0.25, fontSize: 12, lineHeight: 1.3 } }}
      >
        {ROLE_KEYS.map((key) => (
          <ToggleButton key={key} value={key} color="primary">
            {ROLES[key].short}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
