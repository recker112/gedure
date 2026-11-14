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

/**
 * Router
 */
import lazyPage from "./lazyPage";

/**
 * Árbol de rutas. Ojo con el catch-all de Laravel (backend/routes/web.php):
 * no sirve el SPA para `api`, `up`, `app`, `broadcasting` ni `assets/`, así
 * que ninguna ruta pública puede empezar por esos segmentos.
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
         * <Outlet /> sin volver a montar la navegación.
         */
        lazy: lazyPage(() => import("../components/ui/PublicLayout")),
        errorElement: <ErrorFallback />,
        children: [
          {
            index: true,
            lazy: lazyPage(() => import("../core/home/HomePage")),
          },
          {
            path: "nosotros",
            lazy: lazyPage(() => import("../core/about/AboutPage")),
          },
          {
            path: "noticias",
            lazy: lazyPage(() => import("../core/news/NewsPage")),
          },
          {
            path: "noticias/:slug",
            lazy: lazyPage(() => import("../core/news/NewsShowPage")),
          },
          {
            path: "contactanos",
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
       * Acceso a Gedure. Sin el layout público: pantalla propia como el
       * login de BluLabel. Placeholder hasta el login real con Sanctum.
       */
      {
        path: "login",
        lazy: lazyPage(() => import("../core/login/LoginPage")),
      },
      /* Rutas de la web anterior que pueden seguir enlazadas. */
      {
        path: "entrar",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
];
