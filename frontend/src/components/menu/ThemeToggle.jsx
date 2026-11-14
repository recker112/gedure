/**
 * Redux
 */
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/reducers/user/configReducer";

/**
 * MUI
 */
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

/**
 * Hooks
 */
import { useThemeSelection } from "../../hooks/theme/useThemeSelection";

/** Alterna claro/oscuro; la preferencia se guarda en localStorage (slice userConfig). */
export default function ThemeToggle({ sx }) {
  const dispatch = useDispatch();
  const { mode } = useThemeSelection();
  const label = mode === "dark" ? "Activar modo claro" : "Activar modo oscuro";

  return (
    <Tooltip title={label}>
      <IconButton aria-label={label} onClick={() => dispatch(toggleTheme())} color="inherit" sx={sx}>
        {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}
