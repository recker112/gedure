/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { StatusChip } from "../../components/ui/panel/cards";
import { formatUsd } from "../../mocks/mockData";
import { DEBT_BATCHES } from "./mockData";

/** Lotes de deudas (admin): mensualidades y cargos masivos. */
export default function DebtBatchesPage() {
  return (
    <PanelPage
      title="Lotes de deudas"
      description="Carga mensualidades y otros conceptos a varios estudiantes a la vez y sigue su cobro."
      actions={
        <Button variant="contained" startIcon={<AddIcon />}>
          Nuevo lote
        </Button>
      }
    >
      <DataTable
        label="Lotes de deudas"
        rows={DEBT_BATCHES}
        searchKeys={["concept", "target"]}
        searchPlaceholder="Buscar concepto"
        filters={[{ key: "status", label: "Estado", options: ["Activo", "Completo"] }]}
        columns={[
          {
            key: "concept",
            label: "Concepto",
            render: (b) => (
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {b.concept}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {b.target}
                </Typography>
              </Box>
            ),
          },
          { key: "usd", label: "Monto", align: "right", render: (b) => formatUsd(b.usd) },
          { key: "due", label: "Vence", hideOnMobile: true },
          {
            key: "progress",
            label: "Cobro",
            hideOnMobile: true,
            width: 200,
            render: (b) => {
              const pct = Math.round((b.paid / b.debts) * 100);
              return (
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    {b.paid}/{b.debts} pagadas ({pct}%)
                  </Typography>
                  <LinearProgress variant="determinate" value={pct} aria-label={`Cobro de ${b.concept}: ${pct}%`} sx={{ height: 6, borderRadius: 3 }} />
                </Box>
              );
            },
          },
          { key: "status", label: "Estado", render: (b) => <StatusChip label={b.status} /> },
        ]}
      />
    </PanelPage>
  );
}
