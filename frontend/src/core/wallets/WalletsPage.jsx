/**
 * MUI
 */
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { PersonCell, StatusChip } from "../../components/ui/panel/cards";
import { formatBs, formatUsd } from "../../mocks/mockData";
import { WALLETS } from "./mockData";

/** Monederos de todos los representantes (admin). */
export default function WalletsPage() {
  return (
    <PanelPage title="Monederos" description="Saldo y deuda de cada representante. Desde aquí se hacen ajustes manuales y exoneraciones.">
      <DataTable
        label="Monederos"
        rows={WALLETS}
        searchKeys={["guardian", "cedula"]}
        searchPlaceholder="Buscar representante o cédula"
        filters={[{ key: "status", label: "Situación", options: ["Al día", "Pendiente", "Moroso", "Exonerado"] }]}
        columns={[
          { key: "guardian", label: "Representante", render: (w) => <PersonCell name={w.guardian} detail={w.cedula} /> },
          { key: "students", label: "Estudiantes", align: "center", hideOnMobile: true },
          { key: "balanceBs", label: "Saldo", align: "right", render: (w) => formatBs(w.balanceBs) },
          { key: "debtUsd", label: "Deuda", align: "right", hideOnMobile: true, render: (w) => formatUsd(w.debtUsd) },
          { key: "status", label: "Situación", render: (w) => <StatusChip label={w.status} /> },
          {
            key: "actions",
            label: "",
            align: "right",
            render: (w) => (
              <Button size="small" startIcon={<EditOutlinedIcon />} aria-label={`Ajustar monedero de ${w.guardian}`}>
                Ajustar
              </Button>
            ),
          },
        ]}
      />
    </PanelPage>
  );
}
