/**
 * MUI (iconos por ruta: no arrastran el paquete entero)
 */
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined";

export const PANEL_ROOT = "/gedure";

const ALL = ["admin", "profesor", "representante"];
const ADMIN = ["admin"];

/**
 * MAQUETA. Navegación del panel agrupada por bloques. Fuente única del cajón,
 * las migas y la comprobación de acceso por vista de rol (AppShell). Cada
 * entrada:
 *
 * - `path`: relativo a /gedure (`""` es Inicio). Debe existir en router/panelRoutes.js.
 * - `roles`: vistas que la ven. En la app real será `permission` (users_index,
 *   boletas_upload, debt_lote_index…), como en el useCanAccess de BluLabel.
 * - `titles`: título distinto según la vista (p. ej. "Mis cursos" para el profesor).
 * - `menu: false`: existe (migas, acceso) pero no ocupa sitio en el cajón.
 * - `legacy`: de qué pantalla de la Gedure anterior (rama master) sale.
 */
export const PANEL_NAV = [
  {
    group: null,
    items: [
      { path: "", title: "Inicio", icon: DashboardOutlinedIcon, roles: ALL, legacy: "gedure/home" },
      { path: "comunicados", title: "Comunicados", icon: CampaignOutlinedIcon, roles: ALL, badge: "comunicados", legacy: "Nuevo (posts con audiencia)" },
    ],
  },
  {
    group: "Control de estudio",
    items: [
      { path: "mis-boletas", title: "Boletas", icon: AssignmentOutlinedIcon, roles: ["representante"], legacy: "gedure/boletas (V-)" },
      { path: "boletas", title: "Boletas", titles: { profesor: "Subir boletas" }, icon: UploadFileOutlinedIcon, roles: ["admin", "profesor"], legacy: "gedure/boletas_admin (boletas_*)" },
      { path: "cursos", title: "Cursos y secciones", titles: { profesor: "Mis cursos" }, icon: SchoolOutlinedIcon, roles: ["admin", "profesor"], legacy: "configuracion/cursos (cursos_*)" },
    ],
  },
  {
    group: "Finanzas",
    items: [
      { path: "estado-de-cuenta", title: "Estado de cuenta", icon: ReceiptLongOutlinedIcon, roles: ["representante"], legacy: "gedure/deudas" },
      { path: "monedero", title: "Monedero", icon: AccountBalanceWalletOutlinedIcon, roles: ["representante"], legacy: "gedure/monedero (+ transfer, verify)" },
      { path: "pagos", title: "Pagos por verificar", icon: FactCheckOutlinedIcon, roles: ADMIN, badge: "pagos", legacy: "PendingPayment + bank_transaction_*" },
      { path: "lotes-deudas", title: "Lotes de deudas", icon: PlaylistAddCheckOutlinedIcon, roles: ADMIN, legacy: "gedure/lotes_deudas (debt_lote_*)" },
      { path: "transacciones", title: "Transacciones", icon: SwapHorizOutlinedIcon, roles: ADMIN, legacy: "gedure/transacciones (transaction_index)" },
      { path: "monederos", title: "Monederos", icon: SavingsOutlinedIcon, roles: ADMIN, legacy: "gedure/monedero_admin (wallet_*)" },
    ],
  },
  {
    group: "Administración",
    items: [
      { path: "usuarios", title: "Usuarios", icon: PeopleAltOutlinedIcon, roles: ADMIN, legacy: "gedure/usuarios (users_*)" },
      { path: "publicaciones", title: "Publicaciones", icon: EditNoteOutlinedIcon, roles: ADMIN, legacy: "gedure/publicaciones (posts_*)" },
      { path: "mensajes", title: "Mensajes de contacto", icon: MailOutlineIcon, roles: ADMIN, badge: "mensajes", legacy: "gedure/soli_contacto (contact_*)" },
      { path: "registros", title: "Registros", icon: HistoryOutlinedIcon, roles: ADMIN, legacy: "gedure/registros (registros_index)" },
      { path: "configuracion", title: "Configuración", icon: SettingsOutlinedIcon, roles: ADMIN, legacy: "gedure/configuracion (gc_*, bank_account_*)" },
    ],
  },
  {
    // Sin título: cierra el menú. Perfil y notificaciones no ocupan sitio en
    // él (`menu: false`): se abren desde el avatar y la campana del AppBar.
    group: null,
    items: [
      { path: "noticias", title: "Noticias del colegio", icon: NewspaperOutlinedIcon, roles: ALL, legacy: "news (pública) dentro de Gedure" },
      { path: "ayuda", title: "Ayuda", icon: HelpOutlineIcon, roles: ALL, legacy: "gedure/faq + contacto con sesión" },
      { path: "perfil", title: "Mi perfil", icon: PersonOutlineIcon, roles: ALL, menu: false, legacy: "gedure/cuenta" },
      { path: "notificaciones", title: "Notificaciones", icon: NotificationsNoneOutlinedIcon, roles: ALL, menu: false, legacy: "NotificationController" },
    ],
  },
];

/** Todas las entradas, planas y con su grupo y URL absoluta. */
export const PANEL_ITEMS = PANEL_NAV.flatMap(({ group, items }) =>
  items.map((item) => ({ ...item, group, to: item.path ? `${PANEL_ROOT}/${item.path}` : PANEL_ROOT })),
);

/** Título de la entrada para la vista `role`. */
export const itemTitle = (item, role) => item?.titles?.[role] ?? item?.title;

/** Vistas con pocas secciones: menú en una sola lista, sin títulos de bloque. */
const FLAT_MENU = ["representante", "profesor"];

/** Bloques del cajón con solo las entradas visibles para `role` (sin bloques vacíos). */
export function navForRole(role) {
  const groups = PANEL_NAV.map(({ group, items }) => ({
    group,
    items: items
      .filter((item) => item.roles.includes(role) && item.menu !== false)
      .map((item) => PANEL_ITEMS.find((i) => i.path === item.path)),
  })).filter(({ items }) => items.length > 0);
  return FLAT_MENU.includes(role) ? [{ group: null, items: groups.flatMap(({ items }) => items) }] : groups;
}

/** Entrada de la URL `pathname` (exacta o subruta, la más específica). */
export function findPanelItem(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return PANEL_ITEMS.filter((item) => path === item.to || (item.path && path.startsWith(`${item.to}/`))).sort(
    (a, b) => b.to.length - a.to.length,
  )[0];
}

/** true si la entrada (o una URL desconocida, que cae en el 404) se ve con `role`. */
export const canSeeItem = (item, role) => !item || item.roles.includes(role);
