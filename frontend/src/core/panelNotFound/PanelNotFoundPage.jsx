/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import { EmptyState } from "../../components/ui/panel/cards";
import { PANEL_ROOT } from "../../components/menu/panel/panelNav";

/** 404 dentro del panel: conserva la barra lateral. */
export default function PanelNotFoundPage() {
  return (
    <PanelPage title="Página no encontrada">
      <Card>
        <EmptyState
          icon={SearchOffOutlinedIcon}
          title="Esta sección no existe"
          description="Puede que el enlace esté mal escrito o que la sección aún no forme parte de Gedure."
          action={
            <Button component={RouterLink} to={PANEL_ROOT} variant="contained">
              Volver al inicio
            </Button>
          }
        />
      </Card>
    </PanelPage>
  );
}
