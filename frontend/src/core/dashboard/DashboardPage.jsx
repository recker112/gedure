/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

/**
 * Components
 */
import useTitleHook from "../../hooks/utils/useTitleHook";
import { ShortcutCard, StatCard } from "../../components/ui/panel/cards";
import { useMockRole } from "../../hooks/app/useMockRole";
import { useSessionUser } from "../../hooks/auth/useSessionUser";
import { initials } from "../../components/utils/initials";
import { CHILDREN, COURSES, TEACHER_COURSE_IDS, formatBs, formatUsd } from "../../mocks/mockData";
import { announcementsFor } from "../announcements/mockData";
import { Greeting, ListBlock, QuickLinks, SchoolNewsBlock, UnreadAnnouncements } from "./widgets";
import { ADMIN_KPIS, GUARDIAN_ACCOUNT, GUARDIAN_NEW_REPORT_CARDS, RECENT_ACTIVITY, REPORT_CARDS_DEADLINE, TEACHER_PENDING } from "./mockData";

const unreadCount = (role) => announcementsFor(role).filter((a) => !a.read[role]).length;
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** Tres accesos (o indicadores) en fila desde `md`; uno debajo de otro en móvil. */
const THIRD = { xs: 12, md: 4 };

/**
 * Representante (el usuario más frecuente): tres accesos grandes, los
 * comunicados pendientes y, discretas, las noticias del colegio.
 */
function GuardianDashboard() {
  const unread = unreadCount("representante");

  return (
    <>
      <Grid container spacing={2.5}>
        <Grid size={THIRD}>
          <ShortcutCard
            title="Comunicados"
            to="/gedure/comunicados"
            icon={CampaignOutlinedIcon}
            tone="secondary"
            value={unread ? `${unread} sin leer` : "Al día"}
            hint={unread ? "Mensajes del colegio para ti." : "No tienes mensajes pendientes."}
          />
        </Grid>
        <Grid size={THIRD}>
          <ShortcutCard
            title="Estado de cuenta"
            to="/gedure/estado-de-cuenta"
            icon={ReceiptLongOutlinedIcon}
            tone="warning"
            value={GUARDIAN_ACCOUNT.debtUsd ? `Debes ${formatUsd(GUARDIAN_ACCOUNT.debtUsd)}` : "Al día"}
            hint={GUARDIAN_ACCOUNT.debtUsd ? `Vence el ${GUARDIAN_ACCOUNT.nextDue}.` : "No tienes pagos pendientes."}
            action={
              <Button component={RouterLink} to="/gedure/monedero" variant="contained" fullWidth size="large" startIcon={<PaymentsOutlinedIcon />}>
                Pagar o reportar pago
              </Button>
            }
          />
        </Grid>
        <Grid size={THIRD}>
          <ShortcutCard
            title="Boletas"
            to="/gedure/mis-boletas"
            icon={AssignmentOutlinedIcon}
            value={GUARDIAN_NEW_REPORT_CARDS ? plural(GUARDIAN_NEW_REPORT_CARDS, "nueva", "nuevas") : "Sin novedades"}
            hint="Las boletas de tus representados."
          />
        </Grid>
      </Grid>
      <UnreadAnnouncements role="representante" limit={3} />
      <SchoolNewsBlock limit={2} />
    </>
  );
}

/** Profesor: boletas por subir, cursos y comunicados; debajo, el avance por curso. */
function TeacherDashboard() {
  const myCourses = COURSES.filter((c) => TEACHER_COURSE_IDS.includes(c.id));
  const missing = TEACHER_PENDING.reduce((sum, c) => sum + (c.total - c.uploaded), 0);
  const unread = unreadCount("profesor");

  return (
    <>
      <Grid container spacing={2.5}>
        <Grid size={THIRD}>
          <ShortcutCard title="Subir boletas" to="/gedure/boletas" icon={UploadFileOutlinedIcon} tone="warning" value={missing ? `Faltan ${missing}` : "Completas"} hint={`La carga cierra el ${REPORT_CARDS_DEADLINE}.`} />
        </Grid>
        <Grid size={THIRD}>
          <ShortcutCard
            title="Mis cursos"
            to="/gedure/cursos"
            icon={GroupsOutlinedIcon}
            value={plural(myCourses.length, "curso", "cursos")}
            hint={`${myCourses.reduce((s, c) => s + c.students, 0)} estudiantes en total.`}
          />
        </Grid>
        <Grid size={THIRD}>
          <ShortcutCard title="Comunicados" to="/gedure/comunicados" icon={CampaignOutlinedIcon} tone="secondary" value={unread ? `${unread} sin leer` : "Al día"} hint="Avisos de la dirección." />
        </Grid>
      </Grid>
      <ListBlock title="Boletas por curso" moreLabel="Subir boletas" moreTo="/gedure/boletas">
        <Stack spacing={2.5} sx={{ p: 2.5 }}>
          {TEACHER_PENDING.map((c) => {
            const pct = Math.round((c.uploaded / c.total) * 100);
            return (
              <Box key={c.course}>
                <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.75, gap: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>{c.course}</Typography>
                  <Typography color="textSecondary">{pct === 100 ? "Completo" : `${c.uploaded} de ${c.total}`}</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={pct} color={pct === 100 ? "success" : "primary"} aria-label={`Boletas de ${c.course}: ${pct}%`} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            );
          })}
        </Stack>
      </ListBlock>
      <UnreadAnnouncements role="profesor" limit={3} />
    </>
  );
}

/** Admin: tres indicadores que piden acción hoy, accesos y actividad reciente. */
function AdminDashboard() {
  return (
    <>
      <Grid container spacing={2.5}>
        <Grid size={THIRD}>
          <StatCard
            label="Pagos por verificar"
            value={ADMIN_KPIS.pendingPayments}
            hint={`${formatBs(ADMIN_KPIS.paymentsTodayBs)} recibidos hoy`}
            icon={FactCheckOutlinedIcon}
            tone="warning"
            to="/gedure/pagos"
          />
        </Grid>
        <Grid size={THIRD}>
          <StatCard label="Deudas pendientes" value={formatUsd(ADMIN_KPIS.pendingDebtUsd)} hint={ADMIN_KPIS.pendingDebtHint} icon={ReceiptLongOutlinedIcon} to="/gedure/lotes-deudas" />
        </Grid>
        <Grid size={THIRD}>
          <StatCard label="Mensajes sin leer" value={ADMIN_KPIS.unreadMessages} hint={ADMIN_KPIS.unreadMessagesHint} icon={MailOutlineIcon} tone="secondary" to="/gedure/mensajes" />
        </Grid>
      </Grid>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <QuickLinks
            links={[
              { label: "Verificar pagos", to: "/gedure/pagos", icon: FactCheckOutlinedIcon },
              { label: "Publicar comunicado", to: "/gedure/publicaciones", icon: CampaignOutlinedIcon },
              { label: "Generar lote de deudas", to: "/gedure/lotes-deudas", icon: PlaylistAddCheckOutlinedIcon },
              { label: "Registrar usuario", to: "/gedure/usuarios", icon: PersonAddAltOutlinedIcon },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <ListBlock title="Actividad reciente" moreLabel="Ver registros" moreTo="/gedure/registros">
            <List disablePadding>
              {RECENT_ACTIVITY.map((a, i) => (
                <ListItem key={a.id} divider={i < RECENT_ACTIVITY.length - 1} sx={{ px: 2.5 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 34, height: 34, fontSize: 13, bgcolor: "primary.light", color: "primary.main" }}>{initials(a.who)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <strong>{a.who}</strong> {a.what}
                      </>
                    }
                    secondary={a.when}
                  />
                </ListItem>
              ))}
            </List>
          </ListBlock>
        </Grid>
      </Grid>
    </>
  );
}

const DASHBOARDS = { admin: AdminDashboard, profesor: TeacherDashboard, representante: GuardianDashboard };

const firstName = (children) => children.map((c) => c.name.split(" ")[0]);

/** Una frase bajo el saludo, en lenguaje sencillo. */
const SUBTITLES = {
  admin: "Esto es lo que necesita atención hoy.",
  profesor: `Tienes ${TEACHER_COURSE_IDS.length} cursos este lapso.`,
  representante: `Representas a ${firstName(CHILDREN).join(" y ")}.`,
};

/**
 * Inicio del panel. MAQUETA: el contenido depende de la vista de rol; el
 * nombre del saludo es el real de la sesión.
 */
export default function DashboardPage() {
  const { role } = useMockRole();
  const { name, username } = useSessionUser();
  useTitleHook("Inicio");
  const Dashboard = DASHBOARDS[role];
  const greetingName = (name || username).split(" ")[0];

  return (
    <Stack spacing={{ xs: 3.5, md: 4.5 }}>
      <Greeting name={greetingName} subtitle={SUBTITLES[role]} />
      <Dashboard />
    </Stack>
  );
}
