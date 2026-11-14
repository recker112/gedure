/**
 * React Router
 */
import { Outlet } from "react-router-dom";

/**
 * Layout de la rama privada. Va SIEMPRE dentro de <AuthProtect /> (ver
 * router/routes.jsx), así que solo se monta con una sesión que ya superó el
 * 2FA.
 *
 * Aquí irá el <EchoProvider> (Laravel Echo + Reverb) cuando haya canales que
 * escuchar, como en BluLabel: el backend ya autoriza POST
 * /api/broadcasting/auth con el Bearer definitivo (con el temporal es 403), y
 * por eso el socket debe abrirse aquí y no antes. Todavía no se monta.
 */
export default function AuthLayout() {
  return <Outlet />;
}
