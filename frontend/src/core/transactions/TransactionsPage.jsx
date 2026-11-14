/**
 * MUI
 */
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { PersonCell, StatusChip } from "../../components/ui/panel/cards";
import { formatBs } from "../../mocks/mockData";
import { TRANSACTIONS } from "./mockData";

/** Historial de transacciones del sistema de pagos (admin). */
export default function TransactionsPage() {
  return (
    <PanelPage
      title="Transacciones"
      description="Todos los movimientos de los monederos: recargas, pagos, reembolsos y ajustes."
      actions={
        <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon />}>
          Exportar Excel
        </Button>
      }
    >
      <DataTable
        label="Transacciones"
        rows={TRANSACTIONS}
        searchKeys={["id", "user", "concept"]}
        searchPlaceholder="Buscar código, usuario o concepto"
        filters={[
          { key: "type", label: "Tipo", options: ["Recarga", "Pago", "Reembolso", "Ajuste"] },
          { key: "status", label: "Estado", options: ["Pendiente", "Aprobado", "Pagado", "Rechazado"] },
        ]}
        pageSize={8}
        columns={[
          { key: "id", label: "Código", render: (t) => <Typography variant="body2" sx={{ fontFamily: "monospace" }}>{t.id}</Typography> },
          { key: "date", label: "Fecha", hideOnMobile: true },
          { key: "user", label: "Usuario", render: (t) => <PersonCell name={t.user} detail={t.type} /> },
          { key: "concept", label: "Concepto", hideOnMobile: true },
          {
            key: "amountBs",
            label: "Monto",
            align: "right",
            render: (t) => (
              <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                {t.amountBs > 0 ? "+" : ""}
                {formatBs(t.amountBs)}
              </Typography>
            ),
          },
          { key: "status", label: "Estado", render: (t) => <StatusChip label={t.status} /> },
        ]}
      />
    </PanelPage>
  );
}
