/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { PersonCell, StatCard, StatusChip } from "../../components/ui/panel/cards";
import { formatBs } from "../../mocks/mockData";
import { PENDING_PAYMENTS } from "./mockData";

/** Pagos reportados por verificar (admin). */
export default function PaymentsPage() {
  const pending = PENDING_PAYMENTS.filter((p) => p.status === "Por verificar");
  const matched = pending.filter((p) => p.match).length;

  return (
    <PanelPage
      title="Pagos por verificar"
      description="Cruza los pagos reportados con el estado de cuenta del banco y apruébalos para abonar el monedero."
      actions={
        <Button variant="outlined" startIcon={<UploadFileOutlinedIcon />}>
          Subir estado de cuenta
        </Button>
      }
    >
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Por verificar" value={pending.length} hint={formatBs(pending.reduce((s, p) => s + p.amountBs, 0))} icon={FactCheckOutlinedIcon} tone="warning" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Coinciden con el banco" value={matched} hint="Listos para aprobar" icon={LinkOutlinedIcon} tone="success" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Sin coincidencia" value={pending.length - matched} hint="Revisar referencia o monto" icon={LinkOffOutlinedIcon} tone="error" />
        </Grid>
      </Grid>
      <DataTable
        label="Pagos reportados"
        rows={PENDING_PAYMENTS}
        searchKeys={["guardian", "cedula", "reference"]}
        searchPlaceholder="Buscar representante, cédula o referencia"
        filters={[
          { key: "method", label: "Método", options: ["Pago móvil", "Transferencia"] },
          { key: "status", label: "Estado", options: ["Por verificar", "Aprobado", "Rechazado"] },
        ]}
        columns={[
          { key: "guardian", label: "Representante", render: (p) => <PersonCell name={p.guardian} detail={p.cedula} /> },
          { key: "method", label: "Método", hideOnMobile: true, render: (p) => `${p.method} · ${p.bank}` },
          { key: "reference", label: "Referencia", hideOnMobile: true },
          { key: "amountBs", label: "Monto", align: "right", render: (p) => formatBs(p.amountBs) },
          {
            key: "match",
            label: "Banco",
            hideOnMobile: true,
            render: (p) => <Chip size="small" variant="outlined" label={p.match ? "Coincide" : "Sin coincidencia"} color={p.match ? "success" : "default"} />,
          },
          { key: "status", label: "Estado", render: (p) => <StatusChip label={p.status} /> },
          {
            key: "actions",
            label: "Acciones",
            align: "right",
            render: (p) =>
              p.status === "Por verificar" ? (
                <Box sx={{ whiteSpace: "nowrap" }}>
                  <Tooltip title="Aprobar">
                    <IconButton size="small" color="success" aria-label={`Aprobar pago de ${p.guardian}`}>
                      <CheckIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Rechazar">
                    <IconButton size="small" color="error" aria-label={`Rechazar pago de ${p.guardian}`}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                "—"
              ),
          },
        ]}
      />
    </PanelPage>
  );
}
