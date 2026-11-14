/**
 * MAQUETA. Datos de ejemplo COMPARTIDOS por varias secciones del panel (cursos,
 * estudiantes, contadores, notificaciones). Todos los nombres son ficticios.
 * Cada sección tiene además su propio `core/<seccion>/mockData.js`. Al
 * conectar la API, estos datos se sustituyen por endpoints de RTK Query.
 */

/** Periodo escolar y tipo de cambio de referencia (BCV) de la maqueta. */
export const SCHOOL_YEAR = "2026-2027";
export const CURRENT_LAPSE = "1.er lapso";
/** "Hoy" de la maqueta (fijo, para que los datos de ejemplo cuadren). */
export const TODAY_LABEL = "sábado, 14 de noviembre de 2026";
export const EXCHANGE_RATE = { rate: 312.45, date: "14/11/2026", source: "BCV" };

/** Persona que "usa" la maqueta según la vista de rol (cabecera y saludo). */
export const MOCK_PROFILES = {
  admin: { name: "Carmen Elena Salazar", title: "Coordinación administrativa", privilege: "A-" },
  profesor: { name: "Luis Alberto Méndez", title: "Prof. de Matemática · Media General", privilege: "P-" },
  representante: { name: "Andreína Castillo", title: "Representante de 2 estudiantes", privilege: "V-" },
};

/** Cursos y secciones (Primaria, Media General 1.º-3.er año y Media Técnica 4.º-6.º). */
export const COURSES = [
  { id: 1, level: "Primaria", name: "5.º grado", section: "A", students: 31, tutor: "Yusmary Torres", boletas: 31 },
  { id: 2, level: "Primaria", name: "6.º grado", section: "A", students: 29, tutor: "Rosa Villegas", boletas: 22 },
  { id: 3, level: "Media General", name: "1.er año", section: "A", students: 34, tutor: "Luis Alberto Méndez", boletas: 34 },
  { id: 4, level: "Media General", name: "1.er año", section: "B", students: 32, tutor: "Daniela Ochoa", boletas: 12 },
  { id: 5, level: "Media General", name: "2.º año", section: "A", students: 33, tutor: "Luis Alberto Méndez", boletas: 27 },
  { id: 6, level: "Media General", name: "3.er año", section: "A", students: 30, tutor: "Pedro Guzmán", boletas: 0 },
  { id: 7, level: "Media Técnica", name: "4.º año", section: "Informática", students: 27, tutor: "Ana Karina Ruiz", boletas: 27 },
  { id: 8, level: "Media Técnica", name: "5.º año", section: "Informática", students: 25, tutor: "Héctor Blanco", boletas: 25 },
  { id: 9, level: "Media Técnica", name: "6.º año", section: "Contabilidad", students: 22, tutor: "Milagros Pinto", boletas: 9 },
];

export const courseLabel = (course) => `${course.name} ${course.section}`;

/** Cursos del profesor de ejemplo. */
export const TEACHER_COURSE_IDS = [3, 4, 5];

/** Representados de la representante de ejemplo. */
export const CHILDREN = [
  { id: 101, name: "Sofía Castillo", cedula: "V-32.418.907", course: "2.º año A", initials: "SC" },
  { id: 102, name: "Diego Castillo", cedula: "V-34.002.115", course: "5.º grado A", initials: "DC" },
];

/** Contadores de la barra lateral (`badge` en panelNav.js). */
export const NAV_BADGES = {
  admin: { comunicados: 1, pagos: 7, mensajes: 4 },
  profesor: { comunicados: 2 },
  representante: { comunicados: 2 },
};

/** Notificaciones de la campana y de /gedure/notificaciones. */
export const NOTIFICATIONS = {
  admin: [
    { id: 1, title: "7 pagos por verificar", body: "Transferencias y pagos móviles reportados hoy.", date: "Hace 10 min", read: false, to: "/gedure/pagos" },
    { id: 2, title: "Nuevo mensaje de contacto", body: "«Consulta sobre inscripciones 2027» de Gabriela Mora.", date: "Hace 1 h", read: false, to: "/gedure/mensajes" },
    { id: 3, title: "Boletas del 1.er lapso", body: "5.º año Informática completó la carga de boletas.", date: "Ayer", read: false, to: "/gedure/boletas" },
    { id: 4, title: "Tipo de cambio actualizado", body: "BCV: 312,45 Bs por USD.", date: "Ayer", read: true, to: "/gedure/configuracion" },
  ],
  profesor: [
    { id: 1, title: "Faltan boletas por subir", body: "2.º año A: 6 estudiantes sin boleta del 1.er lapso.", date: "Hace 2 h", read: false, to: "/gedure/boletas" },
    { id: 2, title: "Nuevo comunicado", body: "«Consejo de docentes del viernes 20».", date: "Hoy", read: false, to: "/gedure/comunicados" },
    { id: 3, title: "Cambio de aula", body: "La sección 1.er año B pasa al aula 12.", date: "Lun 9 nov", read: true, to: "/gedure/cursos" },
  ],
  representante: [
    { id: 1, title: "Boleta disponible", body: "Ya puedes descargar la boleta del 1.er lapso de Sofía.", date: "Hace 3 h", read: false, to: "/gedure/mis-boletas" },
    { id: 2, title: "Pago verificado", body: "Tu pago móvil de Bs 18.747,00 fue aprobado.", date: "Ayer", read: false, to: "/gedure/monedero" },
    { id: 3, title: "Nuevo comunicado", body: "«Reunión de representantes de 2.º año».", date: "Ayer", read: false, to: "/gedure/comunicados" },
    { id: 4, title: "Mensualidad de diciembre", body: "Vence el 5 de diciembre de 2026.", date: "Lun 9 nov", read: true, to: "/gedure/estado-de-cuenta" },
  ],
};

/** Formato de montos (separadores venezolanos fijos, sin depender del ICU del navegador). */
function formatNumber(value) {
  const [int, dec] = Math.abs(value).toFixed(2).split(".");
  return `${value < 0 ? "-" : ""}${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${dec}`;
}
export const formatBs = (value) => `Bs ${formatNumber(value)}`;
export const formatUsd = (value) => `$${formatNumber(value)}`;
