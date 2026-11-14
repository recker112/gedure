/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import FindReplaceOutlinedIcon from "@mui/icons-material/FindReplaceOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { PersonCell, StatusChip } from "../../components/ui/panel/cards";
import { useMockRole } from "../../hooks/app/useMockRole";
import { COURSES, TEACHER_COURSE_IDS, courseLabel } from "../../mocks/mockData";
import { REPORT_CARDS } from "./mockData";

/** Zona de subida masiva (deshabilitada en la maqueta). */
function UploadZone() {
  return (
    <Card
      variant="outlined"
      sx={{ p: 3, borderStyle: "dashed", borderWidth: 2, borderColor: "primary.main", bgcolor: "primary.light", textAlign: "center" }}
    >
      <CloudUploadOutlinedIcon color="primary" sx={{ fontSize: 40 }} aria-hidden />
      <Typography sx={{ fontWeight: 700, mt: 1 }}>Arrastra aquí los PDF de las boletas</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 520, mx: "auto", mt: 0.5 }}>
        Nombra cada archivo con la cédula del estudiante (p. ej. 32418907.pdf) y Gedure la asigna sola. Si ya existe, se reemplaza.
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} disabled>
        Seleccionar archivos
      </Button>
    </Card>
  );
}

/**
 * Gestión de boletas (admin: todas; profesor: las de sus cursos). Ver,
 * subir y reemplazar, como boletas_admin de la Gedure anterior.
 */
export default function ReportCardsPage() {
  const { role } = useMockRole();
  const isTeacher = role === "profesor";
  const allowed = isTeacher ? COURSES.filter((c) => TEACHER_COURSE_IDS.includes(c.id)).map(courseLabel) : COURSES.map(courseLabel);
  const rows = REPORT_CARDS.filter((b) => allowed.includes(b.course));

  return (
    <PanelPage
      title={isTeacher ? "Subir boletas" : "Boletas"}
      description={isTeacher ? "Carga las boletas del 1.er lapso de tus cursos antes del 18/11/2026." : "Boletas de todos los cursos: consulta, sube y reemplaza."}
      actions={
        <Button variant="contained" startIcon={<CloudUploadOutlinedIcon />}>
          Subir boletas
        </Button>
      }
    >
      <UploadZone />
      <DataTable
        label="Boletas del 1.er lapso"
        rows={rows}
        searchKeys={["name", "cedula"]}
        searchPlaceholder="Buscar por nombre o cédula"
        filters={[
          { key: "course", label: "Curso", options: [...new Set(rows.map((r) => r.course))] },
          { key: "status", label: "Estado", options: ["Subida", "Reemplazada", "Sin subir"] },
        ]}
        columns={[
          { key: "name", label: "Estudiante", render: (r) => <PersonCell name={r.name} detail={r.cedula} /> },
          { key: "course", label: "Curso", hideOnMobile: true },
          { key: "lapse", label: "Lapso", hideOnMobile: true },
          { key: "status", label: "Estado", render: (r) => <StatusChip label={r.status} /> },
          { key: "updated", label: "Actualizada", hideOnMobile: true },
          {
            key: "actions",
            label: "Acciones",
            align: "right",
            render: (r) => (
              <Box sx={{ whiteSpace: "nowrap" }}>
                <Tooltip title="Descargar">
                  <span>
                    <IconButton size="small" aria-label={`Descargar boleta de ${r.name}`} disabled={!r.file}>
                      <FileDownloadOutlinedIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={r.file ? "Reemplazar" : "Subir"}>
                  <IconButton size="small" aria-label={`${r.file ? "Reemplazar" : "Subir"} boleta de ${r.name}`}>
                    {r.file ? <FindReplaceOutlinedIcon fontSize="small" /> : <CloudUploadOutlinedIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
                {!isTeacher && (
                  <Tooltip title="Eliminar">
                    <span>
                      <IconButton size="small" aria-label={`Eliminar boleta de ${r.name}`} disabled={!r.file}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </Box>
            ),
          },
        ]}
      />
      <Stack direction="row" spacing={1}>
        <Typography variant="caption" color="textSecondary">
          Las boletas se publican a los representantes al confirmar el lapso en Configuración.
        </Typography>
      </Stack>
    </PanelPage>
  );
}
