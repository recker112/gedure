/**
 * MUI
 */
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { PersonCell, StatusChip } from "../../components/ui/panel/cards";
import { USERS } from "./mockData";

const TYPE_COLOR = { Administrador: "secondary", Profesor: "primary", Representante: "default", Estudiante: "default" };

/** Usuarios del sistema (admin). */
export default function UsersPage() {
  return (
    <PanelPage
      title="Usuarios"
      description="Administradores, profesores, representantes y estudiantes. Las cuentas nuevas reciben una invitación por correo."
      actions={
        <>
          <Button variant="outlined" startIcon={<UploadFileOutlinedIcon />}>
            Cargar matrícula
          </Button>
          <Button variant="contained" startIcon={<PersonAddAltOutlinedIcon />}>
            Nuevo usuario
          </Button>
        </>
      }
    >
      <DataTable
        label="Usuarios"
        rows={USERS}
        searchKeys={["name", "username", "email"]}
        searchPlaceholder="Buscar por nombre, cédula o correo"
        filters={[
          { key: "type", label: "Tipo", options: ["Administrador", "Profesor", "Representante", "Estudiante"] },
          { key: "status", label: "Estado", options: ["Activo", "Pendiente", "Deshabilitado"] },
        ]}
        columns={[
          { key: "name", label: "Usuario", render: (u) => <PersonCell name={u.name} detail={u.username} /> },
          { key: "type", label: "Tipo", render: (u) => <Chip size="small" label={u.type} color={TYPE_COLOR[u.type]} variant="outlined" /> },
          { key: "detail", label: "Detalle", hideOnMobile: true },
          { key: "email", label: "Correo", hideOnMobile: true },
          { key: "status", label: "Estado", render: (u) => <StatusChip label={u.status} /> },
          { key: "lastLogin", label: "Último acceso", hideOnMobile: true },
          {
            key: "actions",
            label: "",
            align: "right",
            render: (u) => (
              <Tooltip title="Más acciones">
                <IconButton size="small" aria-label={`Acciones de ${u.name}`}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ),
          },
        ]}
      />
    </PanelPage>
  );
}
