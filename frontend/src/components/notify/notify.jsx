/**
 * Sonner
 */
import { toast } from "sonner";

/**
 * Components
 */
import NotifyAlert from "./NotifyAlert";

const show = (severity) => (message, { icon, ...options } = {}) =>
  toast.custom(
    (id) => <NotifyAlert severity={severity} message={message} icon={icon} onClose={() => toast.dismiss(id)} />,
    options,
  );

/**
 * Única puerta de entrada a las notificaciones de la app: ningún otro archivo
 * debe importar `sonner` (salvo el <Toaster /> de App.jsx). Se puede llamar
 * fuera de React (servicios de RTK Query, loaders), no necesita hook.
 */
export const notify = {
  success: show("success"),
  error: show("error"),
  warning: show("warning"),
  info: show("info"),
  dismiss: (id) => toast.dismiss(id),
};
