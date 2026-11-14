/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { MockNotice, SectionCard, StatusChip } from "../../components/ui/panel/cards";
import { EXCHANGE_RATE, formatBs } from "../../mocks/mockData";
import { SCHOOL_ACCOUNTS, WALLET, WALLET_MOVEMENTS } from "./mockData";

/** Monedero del representante: saldo, reportar recarga y movimientos. */
export default function WalletPage() {
  return (
    <PanelPage title="Monedero" description="Recarga saldo con pago móvil o transferencia y úsalo para pagar tus deudas.">
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2.5}>
            <Card
              sx={(theme) => ({
                p: 3,
                color: "#FFFFFF",
                border: 0,
                background: `linear-gradient(135deg, ${theme.palette.mode === "dark" ? "#16233D" : "#1B4F9C"} 0%, ${theme.palette.mode === "dark" ? "#0E1420" : "#133A75"} 100%)`,
              })}
            >
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Saldo disponible
              </Typography>
              <Typography sx={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2 }}>{formatBs(WALLET.balanceBs)}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
                {formatBs(WALLET.pendingBs)} por verificar · Tasa {EXCHANGE_RATE.source} {formatBs(EXCHANGE_RATE.rate)}
              </Typography>
            </Card>
            <SectionCard title="Cuentas del colegio">
              <Stack spacing={1.5}>
                {SCHOOL_ACCOUNTS.map((a) => (
                  <Stack key={a.id} direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                    <AccountBalanceOutlinedIcon color="primary" aria-hidden sx={{ mt: 0.25 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>
                        {a.bank} · {a.type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {a.holder}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                        {a.detail}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <SectionCard title="Reportar recarga">
            <Stack component="form" aria-label="Reportar recarga" spacing={2}>
              <MockNotice>El formulario es solo visual: todavía no envía nada.</MockNotice>
              <TextField select label="Método" defaultValue="pm" disabled>
                <MenuItem value="pm">Pago móvil</MenuItem>
                <MenuItem value="tr">Transferencia</MenuItem>
              </TextField>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField label="Banco de origen" defaultValue="Banesco" disabled fullWidth />
                <TextField label="Referencia" defaultValue="004512" disabled fullWidth />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField label="Monto (Bs)" defaultValue="18.747,00" disabled fullWidth />
                <TextField label="Fecha del pago" defaultValue="14/11/2026" disabled fullWidth />
              </Stack>
              <Box>
                <Button variant="contained" startIcon={<SendOutlinedIcon />} disabled>
                  Enviar para verificación
                </Button>
              </Box>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
      <Typography variant="h6" component="h2">
        Movimientos
      </Typography>
      <DataTable
        label="Movimientos del monedero"
        rows={WALLET_MOVEMENTS}
        searchKeys={["concept", "reference"]}
        searchPlaceholder="Buscar concepto o referencia"
        filters={[{ key: "status", label: "Estado", options: ["Por verificar", "Verificado", "Pagado", "Rechazado"] }]}
        columns={[
          { key: "date", label: "Fecha" },
          { key: "concept", label: "Concepto" },
          { key: "reference", label: "Referencia", hideOnMobile: true },
          {
            key: "amountBs",
            label: "Monto",
            align: "right",
            render: (m) => (
              <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                {m.amountBs > 0 ? "+" : ""}
                {formatBs(m.amountBs)}
              </Typography>
            ),
          },
          { key: "status", label: "Estado", render: (m) => <StatusChip label={m.status} /> },
        ]}
      />
    </PanelPage>
  );
}
