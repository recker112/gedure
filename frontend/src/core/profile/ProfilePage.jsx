/**
 * MUI
 */
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import { MockNotice, SectionCard } from "../../components/ui/panel/cards";
import { useSessionUser } from "../../hooks/auth/useSessionUser";
import { useMockRole } from "../../hooks/app/useMockRole";
import { initials } from "../../components/utils/initials";
import { MOCK_PROFILES } from "../../mocks/mockData";
import { PERSONAL_DATA, SESSIONS } from "./mockData";

/** Mi perfil: datos de la sesión real + datos personales y seguridad de ejemplo. */
export default function ProfilePage() {
  const { name, username, email } = useSessionUser();
  const { role, info } = useMockRole();
  const displayName = name || username;

  return (
    <PanelPage title="Mi perfil" description="Tus datos, tu contraseña y las sesiones abiertas.">
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionCard>
            <Stack spacing={1.5} sx={{ alignItems: "center", textAlign: "center", py: 2 }}>
              <Avatar sx={{ width: 88, height: 88, fontSize: 32, bgcolor: "primary.main", color: "primary.contrastText" }}>{initials(displayName)}</Avatar>
              <Box>
                <Typography variant="h6" component="h2">
                  {displayName}
                </Typography>
                <Typography color="textSecondary">{username}</Typography>
              </Box>
              <Chip label={`${info.privilege} ${info.label}`} color="primary" variant="outlined" />
              <Typography variant="body2" color="textSecondary">
                {MOCK_PROFILES[role].title}
              </Typography>
              <Button variant="outlined" size="small" disabled>
                Cambiar foto
              </Button>
            </Stack>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2.5}>
            <SectionCard title="Datos personales">
              <Stack spacing={2} component="form" aria-label="Datos personales">
                <MockNotice>Edición deshabilitada en la maqueta.</MockNotice>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="Nombre completo" defaultValue={displayName} disabled fullWidth />
                  <TextField label="Cédula / usuario" defaultValue={username} disabled fullWidth />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="Correo" defaultValue={email} disabled fullWidth />
                  <TextField label="Teléfono" defaultValue={PERSONAL_DATA.phone} disabled fullWidth />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="Dirección" defaultValue={PERSONAL_DATA.address} disabled fullWidth />
                  <TextField label="Fecha de nacimiento" defaultValue={PERSONAL_DATA.birthdate} disabled fullWidth />
                </Stack>
              </Stack>
            </SectionCard>
            <SectionCard title="Seguridad" padded={false}>
              <Box sx={{ px: 2.5, pt: 1.5 }}>
                <Button variant="outlined" startIcon={<LockResetOutlinedIcon />} disabled>
                  Cambiar contraseña
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  La verificación en dos pasos por correo está siempre activa.
                </Typography>
              </Box>
              <List>
                {SESSIONS.map((s) => (
                  <ListItem key={s.id} sx={{ px: 2.5 }} secondaryAction={s.current ? <Chip size="small" label="Esta sesión" color="success" variant="outlined" /> : <Button size="small" color="error">Cerrar</Button>}>
                    <ListItemText primary={s.device} secondary={`${s.place} · ${s.when}`} />
                  </ListItem>
                ))}
              </List>
            </SectionCard>
          </Stack>
        </Grid>
      </Grid>
    </PanelPage>
  );
}
