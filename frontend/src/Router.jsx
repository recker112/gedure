/**
 * React
 */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/**
 * Routes
 */
import { routes } from "./router/routes";

const router = createBrowserRouter(routes);

export default function Router() {
  return <RouterProvider router={router} />;
}
