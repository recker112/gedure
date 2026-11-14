/**
 * Icons
 */
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";

/**
 * Enlaces de la navegación pública. Única lista: la usan el AppBar, el menú
 * móvil y el footer. `end` hace que "Inicio" solo se marque en "/".
 * `panelTo`: destino con sesión completa (su versión dentro de Gedure; el
 * loader de la ruta también redirige, ver memberRedirectLoader).
 */
export const navItems = [
  { label: "Inicio", to: "/", end: true, Icon: HomeOutlinedIcon },
  { label: "Nosotros", to: "/nosotros", Icon: SchoolOutlinedIcon },
  { label: "Noticias", to: "/noticias", panelTo: "/gedure/noticias", Icon: NewspaperOutlinedIcon },
  { label: "Contacto", to: "/contactanos", panelTo: "/gedure/ayuda", Icon: MailOutlineIcon },
];

/** Acceso a la plataforma sin sesión (login de Gedure: /auth). Con sesión: SessionButton. */
export const loginItem = { label: "Iniciar sesión", to: "/auth" };

/** Enlaces con su destino según haya sesión completa (`inPanel`) o no. */
export const resolveNavItems = (inPanel) => navItems.map((item) => (inPanel && item.panelTo ? { ...item, to: item.panelTo, end: false } : item));
