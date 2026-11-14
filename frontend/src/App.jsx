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
 * Components
 */
import { useThemeConfig } from "./hooks/theme/useThemeConfig";
import Router from "./Router";

/**
 * El tema sale del store, así que tiene que renderizarse dentro del Provider.
 */
function ThemedApp({ children }) {
  const themeConfig = useThemeConfig();

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline enableColorScheme />
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
