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
 */
export const navItems = [
  { label: "Inicio", to: "/", end: true, Icon: HomeOutlinedIcon },
  { label: "Nosotros", to: "/nosotros", Icon: SchoolOutlinedIcon },
  { label: "Noticias", to: "/noticias", Icon: NewspaperOutlinedIcon },
  { label: "Contacto", to: "/contactanos", Icon: MailOutlineIcon },
];

/** Acceso a la plataforma (login real con Sanctum: pendiente). */
export const loginItem = { label: "Entrar a Gedure", to: "/login" };
