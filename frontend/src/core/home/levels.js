/**
 * Icons
 */
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

/**
 * Etapas educativas (sección "Etapas educativas" de la web anterior). Las
 * descripciones son de ejemplo: pendientes del texto definitivo.
 */
export const levels = [
  {
    title: "Educación Primaria",
    range: "1.º a 6.º grado",
    description: "Primeros pasos en la lectura, la escritura y el cálculo, acompañados de una formación en valores.",
    Icon: AutoStoriesOutlinedIcon,
  },
  {
    title: "Centro Taller Artesanal",
    range: "6.º grado · Escuelas Amigas",
    description: "Talleres pre-vocacionales en dos turnos para estudiantes de las escuelas de la comunidad.",
    Icon: ConstructionOutlinedIcon,
  },
  {
    title: "Educación Media General",
    range: "1.º a 3.er año",
    description: "Base académica sólida y orientación vocacional para elegir mención en la Media Técnica.",
    Icon: MenuBookOutlinedIcon,
  },
  {
    title: "Media Técnica en Informática",
    range: "4.º a 6.º año",
    description: "Comercio y Servicios Administrativos, mención Informática, con pasantías en el último año.",
    Icon: ComputerOutlinedIcon,
  },
  {
    title: "Media Técnica en Contabilidad",
    range: "4.º a 6.º año",
    description: "Comercio y Servicios Administrativos, mención Contabilidad, con pasantías en el último año.",
    Icon: CalculateOutlinedIcon,
  },
  {
    title: "Media Técnica en Administración Financiera",
    range: "4.º a 6.º año",
    description: "Comercio y Servicios Administrativos, mención Administración Financiera, con pasantías.",
    Icon: AccountBalanceOutlinedIcon,
  },
];
