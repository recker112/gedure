/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { StatCard, StatusChip } from "../../components/ui/panel/cards";
import { EXCHANGE_RATE, formatBs, formatUsd } from "../../mocks/mockData";
import { DEBTS } from "./mockData";

/** Estado de cuenta del representante (deudas de sus representados). */
export default function AccountStatusPage() {
  const pending = DEBTS.filter((d) => ["Pendiente", "Por vencer", "Vencido"].includes(d.status));
  const totalUsd = pending.reduce((s, d) => s + d.usd, 0);

  return (
    <PanelPage
      title="Estado de cuenta"
      description={`Lo que debes y lo que ya pagaste. En bolívares se cobra a la tasa ${EXCHANGE_RATE.source} del día.`}
      actions={
        <Button component={RouterLink} to="/gedure/monedero" variant="contained" startIcon={<PaymentsOutlinedIcon />}>
          Pagar o reportar pago
        </Button>
      }
    >
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard label="Saldo pendiente" value={formatUsd(totalUsd)} hint={`≈ ${formatBs(totalUsd * EXCHANGE_RATE.rate)}`} icon={ReceiptLongOutlinedIcon} tone="warning" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard label="Próximo vencimiento" value="30/11/2026" hint="Material de laboratorio" icon={EventOutlinedIcon} />
        </Grid>
      </Grid>
      <DataTable
        label="Deudas"
        rows={DEBTS}
        filters={[
          { key: "student", label: "Estudiante", options: ["Sofía Castillo", "Diego Castillo"] },
          { key: "status", label: "Estado", options: ["Pendiente", "Por vencer", "Pagado", "Exonerado"] },
        ]}
        columns={[
          { key: "concept", label: "Concepto" },
          { key: "student", label: "Estudiante", hideOnMobile: true },
          { key: "due", label: "Vence", hideOnMobile: true },
          { key: "usd", label: "Monto", align: "right", render: (d) => formatUsd(d.usd) },
          { key: "status", label: "Estado", render: (d) => <StatusChip label={d.status} /> },
        ]}
      />
    </PanelPage>
  );
}
