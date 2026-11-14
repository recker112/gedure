/**
 * React
 */
import { Navigate } from "react-router-dom";

/**
 * Components
 */
import RootLayout from "../components/routers/RootLayout";
import RootFallback from "../components/routers/RootFallback";
import ErrorFallback from "../components/routers/ErrorFallback";
import { AuthProtect, NoSeeAuth } from "../components/routers/Routers";

/**
 * Router
 */
import lazyPage from "./lazyPage";
import { guestLoader, homeLoader, memberRedirectLoader, protectLoader, publicLoader } from "./sessionLoaders";
import logoutLoader from "./logoutLoader";
import { panelRoutes } from "./panelRoutes";

/**
 * Árbol de rutas. Ojo con el catch-all de Laravel (backend/routes/web.php):
 * no sirve el SPA para `api`, `up`, `app`, `broadcasting` ni `assets/`, así
 * que ninguna ruta puede empezar por esos segmentos.
 */
export const routes = [
  {
    id: "root",
    element: <RootLayout />,
    // Se ve mientras bajan los chunks de la primera pantalla.
    HydrateFallback: RootFallback,
    errorElement: <ErrorFallback />,
    children: [
      /* Web pública: navbar + <main> + footer */
      {
        /**
         * Ruta layout: se monta una vez y sus hijas cambian dentro del
         * <Outlet /> sin volver a montar la navegación. Su loader no espera a
         * la red: con apiKey guardada revalida la sesión en segundo plano.
         */
        loader: publicLoader,
        shouldRevalidate: () => false,
        lazy: lazyPage(() => import("../components/ui/PublicLayout")),
        errorElement: <ErrorFallback />,
        children: [
          {
            index: true,
            // Con sesión guardada, la portada redirige al panel antes de pintar.
            loader: homeLoader,
            lazy: lazyPage(() => import("../core/home/HomePage")),
          },
          {
            path: "nosotros",
            lazy: lazyPage(() => import("../core/about/AboutPage")),
          },
          {
            path: "noticias",
            // Con sesión completa, a su versión del panel (sessionLoaders.js).
            loader: memberRedirectLoader(() => "/gedure/noticias"),
            lazy: lazyPage(() => import("../core/news/NewsPage")),
          },
          {
            path: "noticias/:slug",
            loader: memberRedirectLoader(({ slug }) => `/gedure/noticias/${encodeURIComponent(slug)}`),
            lazy: lazyPage(() => import("../core/news/NewsShowPage")),
          },
          {
            path: "contactanos",
            // Con sesión, el soporte va por Ayuda (sin volver a pedir los datos).
            loader: memberRedirectLoader(() => "/gedure/ayuda#soporte"),
            lazy: lazyPage(() => import("../core/contact/ContactPage")),
          },
          /* 404 dentro del layout: el visitante conserva la navegación. */
          {
            path: "*",
            lazy: lazyPage(() => import("../core/notfound/NotFoundPage")),
          },
        ],
      },
      /**
       * Acceso a Gedure (como /auth en BluLabel): pantallas propias sin el
       * layout público. Sin sesión: login y recuperar contraseña (NoSeeAuth).
       * Con sesión (temporal o completa): 2FA y cierre de sesión (AuthProtect).
       * Los loaders (router/sessionLoaders.js) redirigen ANTES de pintar; los
       * componentes guard quedan para los cambios de estado sin navegación
       * (login, 2FA, logout), que solo actualizan Redux.
       */
      {
        path: "auth",
        errorElement: <ErrorFallback />,
        lazy: lazyPage(() => import("../core/login/LoginLayout")),
        children: [
          {
            element: <NoSeeAuth />,
            loader: guestLoader,
            children: [
              {
                index: true,
                lazy: lazyPage(() => import("../core/login/PaperLogin")),
              },
              {
                path: "forgot-password",
                lazy: lazyPage(() => import("../core/forgot/PaperForgot")),
              },
            ],
          },
          {
            element: <AuthProtect />,
            children: [
              {
                path: "2fa",
                loader: protectLoader,
                lazy: lazyPage(() => import("../core/2fa/TFAPage")),
              },
              {
                path: "logout",
                loader: logoutLoader,
                lazy: lazyPage(() => import("../core/logout/PaperLogout")),
              },
            ],
          },
        ],
      },
      /**
       * Rama privada (2FA superado). Primero el guard y dentro el layout:
       * AuthLayout pinta el panel (barra lateral + AppBar) y es donde se
       * abrirá el socket (Echo) en el futuro.
       */
      {
        path: "gedure",
        element: <AuthProtect />,
        loader: protectLoader,
        errorElement: <ErrorFallback />,
        children: [
          {
            // Lazy: el panel (barra lateral, menús) no pesa en la web pública.
            lazy: lazyPage(() => import("../components/routers/AuthLayout")),
            // Secciones del panel (maqueta): router/panelRoutes.js
            children: panelRoutes,
          },
        ],
      },
      /* Rutas de la web anterior y de la landing que pueden seguir enlazadas. */
      {
        path: "login",
        element: <Navigate to="/auth" replace />,
      },
      {
        path: "entrar",
        element: <Navigate to="/auth" replace />,
      },
    ],
  },
];
