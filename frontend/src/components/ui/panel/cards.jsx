/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";

/**
 * Utils
 */
import { initials } from "../../utils/initials";

/**
 * Piezas visuales del panel (tarjetas, KPIs, estados vacíos, chips de
 * estado). Sin datos propios: cada sección les pasa los suyos.
 */

/** Tarjeta con cabecera (título h2 + enlace/acción opcional). */
export function SectionCard({ title, action, actionTo, children, sx, padded = true, headingLevel = "h2" }) {
  return (
    <Card component="section" aria-label={title} sx={{ height: "100%", display: "flex", flexDirection: "column", ...sx }}>
      {title && (
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", px: 2.5, pt: 2, pb: padded ? 0 : 1.5, gap: 1 }}>
          <Typography variant="h6" component={headingLevel} sx={{ fontSize: 17 }}>
            {title}
          </Typography>
          {action && actionTo && (
            <Button component={RouterLink} to={actionTo} size="small" endIcon={<ArrowForwardIcon />}>
              {action}
            </Button>
          )}
          {action && !actionTo && action}
        </Stack>
      )}
      <Box sx={{ p: padded ? 2.5 : 0, flexGrow: 1 }}>{children}</Box>
    </Card>
  );
}

/**
 * KPI: icono y etiqueta en una línea y, debajo, el valor a todo el ancho de la
 * tarjeta (antes compartía fila con el icono y en columnas estrechas los
 * montos largos, p. ej. «Bs 512.418,50», quedaban cortados por el
 * overflow:hidden de la Card). El valor puede partirse si aun así no cabe.
 */
export function StatCard({ label, value, hint, icon: Icon, tone = "primary", to }) {
  const content = (
    <Box sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
        {Icon && (
          <Box
            aria-hidden
            sx={(theme) => ({
              width: 36,
              height: 36,
              flexShrink: 0,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: theme.palette[tone].light,
              color: theme.palette[tone].main,
            })}
          >
            <Icon fontSize="small" />
          </Box>
        )}
        <Typography variant="body2" color="textSecondary" sx={{ minWidth: 0 }}>
          {label}
        </Typography>
      </Stack>
      <Typography sx={{ mt: 1.25, fontSize: { xs: 26, sm: 28 }, fontWeight: 700, lineHeight: 1.2, overflowWrap: "anywhere" }}>{value}</Typography>
      {hint && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.25 }}>
          {hint}
        </Typography>
      )}
    </Box>
  );

  return (
    <Card sx={{ height: "100%" }}>
      {to ? (
        <Box component={RouterLink} to={to} sx={{ display: "block", color: "inherit", textDecoration: "none", height: "100%", "&:hover": { bgcolor: "action.hover" } }}>
          {content}
        </Box>
      ) : (
        content
      )}
    </Card>
  );
}

/**
 * Acceso principal del inicio: tarjeta grande y entera pulsable (título,
 * dato destacado y una frase), con un botón opcional debajo (`action`, fuera
 * del enlace). Pensada para el móvil: área táctil amplia y texto grande.
 */
export function ShortcutCard({ title, to, icon: Icon, value, hint, tone = "primary", action }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea component={RouterLink} to={to} sx={{ flexGrow: 1, p: { xs: 2.5, sm: 3 }, display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "flex-start" }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            aria-hidden
            sx={(theme) => ({ width: 44, height: 44, flexShrink: 0, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: theme.palette[tone].light, color: theme.palette[tone].main })}
          >
            <Icon />
          </Box>
          <Typography variant="h6" component="h2" sx={{ fontSize: 18, flexGrow: 1 }}>
            {title}
          </Typography>
          <ArrowForwardIcon fontSize="small" color="action" aria-hidden />
        </Stack>
        {value != null && <Typography sx={{ mt: 2, fontSize: { xs: 26, sm: 30 }, fontWeight: 800, lineHeight: 1.15, overflowWrap: "anywhere" }}>{value}</Typography>}
        {hint && (
          <Typography color="textSecondary" sx={{ mt: 0.5 }}>
            {hint}
          </Typography>
        )}
      </CardActionArea>
      {action && <Box sx={{ px: { xs: 2.5, sm: 3 }, pb: { xs: 2.5, sm: 3 } }}>{action}</Box>}
    </Card>
  );
}

/** Estado vacío: icono, título, texto y acción. */
export function EmptyState({ icon: Icon = ConstructionOutlinedIcon, title, description, action }) {
  return (
    <Stack spacing={1.5} sx={{ alignItems: "center", textAlign: "center", py: 6, px: 2 }}>
      <Box aria-hidden sx={{ width: 64, height: 64, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "primary.light", color: "primary.main" }}>
        <Icon fontSize="large" />
      </Box>
      <Typography variant="h6" component="p">
        {title}
      </Typography>
      {description && (
        <Typography color="textSecondary" sx={{ maxWidth: 440 }}>
          {description}
        </Typography>
      )}
      {action}
    </Stack>
  );
}

/**
 * Estados con su color (siempre con texto, nunca solo color). Clave libre:
 * las secciones pasan la etiqueta y aquí se decide el tono.
 */
const STATUS_TONES = {
  success: ["Pagado", "Aprobado", "Activo", "Publicado", "Subida", "Completo", "Leído", "Respondido", "Verificado", "Abonado", "Al día"],
  warning: ["Pendiente", "Por verificar", "Borrador", "Parcial", "Programado", "Por vencer", "Incompleto"],
  error: ["Vencido", "Rechazado", "Deshabilitado", "Sin subir", "Moroso", "Anulado"],
  info: ["Nuevo", "Reemplazada", "Exonerado", "Cargo"],
};

export function StatusChip({ label, size = "small" }) {
  const tone = Object.keys(STATUS_TONES).find((key) => STATUS_TONES[key].includes(label));
  return <Chip label={label} size={size} color={tone ?? "default"} variant={tone ? "outlined" : "filled"} sx={{ fontWeight: 600 }} />;
}

/** Aviso de "esto es maqueta / todavía no funciona". */
export function MockNotice({ children = "Maqueta visual: los datos son de ejemplo y las acciones aún no hacen nada." }) {
  return (
    <Alert severity="info" variant="outlined" icon={<ConstructionOutlinedIcon fontSize="inherit" />} sx={{ py: 0 }}>
      {children}
    </Alert>
  );
}

/** Celda de persona para tablas: avatar con iniciales, nombre y detalle. */
export function PersonCell({ name, detail }) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", minWidth: 0 }}>
      <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "primary.light", color: "primary.main" }}>{initials(name)}</Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
          {name}
        </Typography>
        {detail && (
          <Typography variant="caption" color="textSecondary" noWrap component="p">
            {detail}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
