/**
 * Noticias DE EJEMPLO. Se sustituirán por la API de publicaciones (RTK Query
 * en store/services/news/) cuando exista; la forma imita lo que pintaba la
 * web anterior (título, slug, extracto, fecha, galería).
 */
export const news = [
  {
    slug: "inicio-del-ano-escolar",
    title: "Inicio del año escolar",
    category: "Institucional",
    date: "2026-09-15",
    excerpt: "Damos la bienvenida a estudiantes, representantes y docentes a un nuevo año escolar lleno de retos.",
    body: [
      "Texto de ejemplo. Aquí irá el contenido completo de la noticia, publicado desde Gedure.",
      "Las noticias podrán incluir imágenes, enlaces y una galería de fotos.",
    ],
  },
  {
    slug: "jornada-de-pasantias",
    title: "Jornada de pasantías de la Media Técnica",
    category: "Media Técnica",
    date: "2026-10-02",
    excerpt: "Los estudiantes de 6.º año presentan las experiencias de sus pasantías en empresas de la zona.",
    body: ["Texto de ejemplo para el detalle de la noticia."],
  },
  {
    slug: "fiesta-de-la-candelaria",
    title: "Celebración de la Virgen de la Candelaria",
    category: "Pastoral",
    date: "2026-02-02",
    excerpt: "La comunidad educativa se une a la parroquia en la celebración de su patrona.",
    body: ["Texto de ejemplo para el detalle de la noticia."],
  },
  {
    slug: "feria-de-ciencias",
    title: "Feria de ciencias y tecnología",
    category: "Académico",
    date: "2026-06-12",
    excerpt: "Proyectos de Primaria y Media General abiertos a toda la comunidad.",
    body: ["Texto de ejemplo para el detalle de la noticia."],
  },
  {
    slug: "taller-artesanal-exposicion",
    title: "Exposición del Centro Taller Artesanal",
    category: "Centro Taller",
    date: "2026-05-20",
    excerpt: "Los talleres muestran los trabajos realizados por los estudiantes de las Escuelas Amigas.",
    body: ["Texto de ejemplo para el detalle de la noticia."],
  },
  {
    slug: "acto-de-grado",
    title: "Acto de grado de la promoción 2026",
    category: "Institucional",
    date: "2026-07-17",
    excerpt: "Felicitamos a los nuevos Técnicos Medios en Informática, Contabilidad y Administración Financiera.",
    body: ["Texto de ejemplo para el detalle de la noticia."],
  },
];

/** Más recientes primero. */
export function latestNews(limit = news.length) {
  return [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function findNews(slug) {
  return news.find((item) => item.slug === slug) ?? null;
}

/** Filtro de la búsqueda del listado (título, extracto y categoría). */
export function searchNews(items, query) {
  const q = query.trim().toLocaleLowerCase("es");
  if (!q) return items;
  return items.filter((item) =>
    [item.title, item.excerpt, item.category].some((text) => text.toLocaleLowerCase("es").includes(q)),
  );
}

const DATE_FORMAT = new Intl.DateTimeFormat("es-VE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function formatNewsDate(iso) {
  return DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}
