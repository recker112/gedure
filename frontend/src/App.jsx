/**
 * MUI
 */
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

/**
 * Redux
 */
import { Provider } from "react-redux";
import store from "./store";

/**
 * Sonner (avisos: components/notify/notify.jsx)
 */
import { Toaster } from "sonner";

/**
 * Components
 */
import { useThemeConfig } from "./hooks/theme/useThemeConfig";
import Router from "./Router";

/**
 * El tema sale del store, así que tiene que renderizarse dentro del Provider.
 * El <Toaster /> va aquí para que los avisos (MUI Alert) usen el tema.
 */
function ThemedApp({ children }) {
  const themeConfig = useThemeConfig();

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline enableColorScheme />
      <Toaster position="bottom-right" visibleToasts={3} duration={5000} containerAriaLabel="Avisos" />
      {children}
    </ThemeProvider>
  );
}

/**
 * Proveedores globales (store + tema). Los tests los usan con un router en
 * memoria en lugar del de navegador.
 */
export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <ThemedApp>{children}</ThemedApp>
    </Provider>
  );
}

export default function App() {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
}
