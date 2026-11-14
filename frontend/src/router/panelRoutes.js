/**
 * Router
 */
import lazyPage from "./lazyPage";

/**
 * Secciones del panel (/gedure/...), hijas de AuthLayout. Cada una es un
 * chunk aparte. Los `path` deben coincidir con components/menu/panel/panelNav.js
 * (lo comprueba router/panelRoutes.test.jsx). MAQUETA: todas pintan datos de
 * `mockData.js`; al conectar la API se añadirán aquí sus loaders.
 */
export const panelRoutes = [
  { index: true, lazy: lazyPage(() => import("../core/dashboard/DashboardPage")) },
  { path: "comunicados", lazy: lazyPage(() => import("../core/announcements/AnnouncementsPage")) },
  { path: "noticias", lazy: lazyPage(() => import("../core/schoolNews/SchoolNewsPage")) },
  // Detalle (destino de /noticias/:slug con sesión): misma entrada de menú.
  { path: "noticias/:slug", lazy: lazyPage(() => import("../core/schoolNews/SchoolNewsShowPage")) },
  { path: "mis-boletas", lazy: lazyPage(() => import("../core/reportCards/MyReportCardsPage")) },
  { path: "boletas", lazy: lazyPage(() => import("../core/reportCards/ReportCardsPage")) },
  { path: "cursos", lazy: lazyPage(() => import("../core/courses/CoursesPage")) },
  { path: "estado-de-cuenta", lazy: lazyPage(() => import("../core/accountStatus/AccountStatusPage")) },
  { path: "monedero", lazy: lazyPage(() => import("../core/wallet/WalletPage")) },
  { path: "pagos", lazy: lazyPage(() => import("../core/payments/PaymentsPage")) },
  { path: "lotes-deudas", lazy: lazyPage(() => import("../core/debtBatches/DebtBatchesPage")) },
  { path: "transacciones", lazy: lazyPage(() => import("../core/transactions/TransactionsPage")) },
  { path: "monederos", lazy: lazyPage(() => import("../core/wallets/WalletsPage")) },
  { path: "usuarios", lazy: lazyPage(() => import("../core/users/UsersPage")) },
  { path: "publicaciones", lazy: lazyPage(() => import("../core/posts/PostsPage")) },
  { path: "mensajes", lazy: lazyPage(() => import("../core/messages/MessagesPage")) },
  { path: "registros", lazy: lazyPage(() => import("../core/logs/LogsPage")) },
  { path: "configuracion", lazy: lazyPage(() => import("../core/settings/SettingsPage")) },
  { path: "perfil", lazy: lazyPage(() => import("../core/profile/ProfilePage")) },
  { path: "notificaciones", lazy: lazyPage(() => import("../core/notifications/NotificationsPage")) },
  { path: "ayuda", lazy: lazyPage(() => import("../core/help/HelpPage")) },
  /* 404 dentro del panel: se conserva la barra lateral. */
  { path: "*", lazy: lazyPage(() => import("../core/panelNotFound/PanelNotFoundPage")) },
];
