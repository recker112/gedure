/**
 * MAQUETA. Publicaciones: un único modelo con AUDIENCIA. "Web" = noticia
 * pública (sale en /noticias y en "Noticias del colegio"); el resto son
 * comunicados privados por rol o curso. PostController (posts_*) de la anterior.
 */
export const POSTS = [
  { id: 1, title: "Reunión de representantes de 2.º año", kind: "Comunicado", audience: "Representantes · 2.º año A", author: "Coord. Media General", date: "13/11/2026", reads: "21/33", status: "Publicado" },
  { id: 2, title: "Mensualidad de diciembre y aguinaldos", kind: "Comunicado", audience: "Todos los representantes", author: "Administración", date: "11/11/2026", reads: "148/231", status: "Publicado" },
  { id: 3, title: "Consejo de docentes del viernes 20", kind: "Comunicado", audience: "Docentes", author: "Dirección", date: "10/11/2026", reads: "18/26", status: "Publicado" },
  { id: 4, title: "Jornada de pasantías de la Media Técnica", kind: "Noticia", audience: "Web pública", author: "Prensa", date: "02/10/2026", reads: "—", status: "Publicado" },
  { id: 5, title: "Inicio del año escolar", kind: "Noticia", audience: "Web pública", author: "Prensa", date: "15/09/2026", reads: "—", status: "Publicado" },
  { id: 6, title: "Simulacro de evacuación", kind: "Comunicado", audience: "Toda la comunidad", author: "Protección civil escolar", date: "20/11/2026", reads: "—", status: "Programado" },
  { id: 7, title: "Feria de ciencias 2027: inscripciones", kind: "Noticia", audience: "Web pública", author: "Prensa", date: "—", reads: "—", status: "Borrador" },
];
