/**
 * React
 */
import { useState } from "react";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { MockNotice, SectionCard, StatCard, StatusChip } from "../../components/ui/panel/cards";
import { formatBs } from "../../mocks/mockData";
import { BANK_ACCOUNTS, EXCHANGE_HISTORY, GENERAL_SETTINGS } from "./mockData";

function GeneralTab() {
  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, md: 7 }}>
        <SectionCard title="Año escolar">
          <Stack spacing={2}>
            <MockNotice>Valores de ejemplo; guardar aún no hace nada.</MockNotice>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label="Año escolar" defaultValue={GENERAL_SETTINGS.schoolYear} disabled fullWidth />
              <TextField select label="Lapso actual" defaultValue={GENERAL_SETTINGS.lapse} disabled fullWidth>
                {["1.er lapso", "2.º lapso", "3.er lapso"].map((l) => (
                  <MenuItem key={l} value={l}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label="Cierre de carga de boletas" defaultValue={GENERAL_SETTINGS.boletasDeadline} disabled fullWidth />
              <TextField label="Día de vencimiento de mensualidades" defaultValue={GENERAL_SETTINGS.debtDay} disabled fullWidth />
            </Stack>
            <Box>
              <Button variant="contained" disabled>
                Guardar cambios
              </Button>
            </Box>
          </Stack>
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <SectionCard title="Funciones">
          <Stack>
            <FormControlLabel control={<Switch defaultChecked disabled />} label="Boletas visibles para representantes" />
            <FormControlLabel control={<Switch defaultChecked disabled />} label="Recargas del monedero" />
            <FormControlLabel control={<Switch disabled />} label="Inscripciones en línea" />
            <FormControlLabel control={<Switch defaultChecked disabled />} label="Formulario de contacto de la web" />
            <FormControlLabel control={<Switch defaultChecked disabled />} label="Modo mantenimiento desactivado" />
          </Stack>
        </SectionCard>
      </Grid>
    </Grid>
  );
}

function BanksTab() {
  return (
    <DataTable
      label="Cuentas bancarias"
      rows={BANK_ACCOUNTS}
      toolbar={
        <Button variant="contained" startIcon={<AddIcon />}>
          Nueva cuenta
        </Button>
      }
      columns={[
        { key: "bank", label: "Banco" },
        { key: "type", label: "Tipo" },
        { key: "number", label: "Número", hideOnMobile: true },
        { key: "rif", label: "RIF", hideOnMobile: true },
        { key: "status", label: "Estado", render: (a) => <StatusChip label={a.status} /> },
      ]}
    />
  );
}

function ExchangeTab() {
  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2.5}>
          <StatCard label="Tasa vigente (USD)" value={formatBs(EXCHANGE_HISTORY[0].rate)} hint={`${EXCHANGE_HISTORY[0].date} · ${EXCHANGE_HISTORY[0].source}`} icon={CurrencyExchangeOutlinedIcon} />
          <SectionCard title="Actualizar a mano">
            <Stack spacing={2}>
              <TextField label="Nueva tasa (Bs por USD)" disabled defaultValue="312,45" />
              <Button variant="outlined" disabled>
                Guardar tasa
              </Button>
            </Stack>
          </SectionCard>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <DataTable
          label="Historial del tipo de cambio"
          rows={EXCHANGE_HISTORY}
          columns={[
            { key: "date", label: "Fecha" },
            { key: "rate", label: "Tasa", align: "right", render: (r) => formatBs(r.rate) },
            { key: "source", label: "Origen" },
          ]}
        />
      </Grid>
    </Grid>
  );
}

const TABS = [
  { key: "general", label: "General", Panel: GeneralTab },
  { key: "bancos", label: "Cuentas bancarias", Panel: BanksTab },
  { key: "cambio", label: "Tipo de cambio", Panel: ExchangeTab },
];

/** Configuración de Gedure (admin), en pestañas. */
export default function SettingsPage() {
  const [tab, setTab] = useState("general");
  const { Panel } = TABS.find((t) => t.key === tab);

  return (
    <PanelPage title="Configuración" description="Año escolar, funciones activas, cuentas del colegio y tipo de cambio.">
      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" allowScrollButtonsMobile aria-label="Apartados de configuración">
        {TABS.map((t) => (
          <Tab key={t.key} value={t.key} label={t.label} id={`tab-${t.key}`} aria-controls={`panel-${t.key}`} />
        ))}
      </Tabs>
      <Box role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        <Panel />
      </Box>
    </PanelPage>
  );
}
