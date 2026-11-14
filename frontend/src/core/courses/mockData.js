/**
 * MAQUETA. Cursos/secciones (compartidos en mocks/mockData.js) y materias del
 * profesor de ejemplo. En la Gedure anterior: CursoController (cursos_*).
 */
export { COURSES, TEACHER_COURSE_IDS, courseLabel } from "../../mocks/mockData";

export const LEVELS = ["Primaria", "Media General", "Media Técnica"];

/** Materias que dicta el profesor de ejemplo, por curso. */
export const TEACHER_SUBJECTS = {
  3: ["Matemática"],
  4: ["Física (refuerzo)"],
  5: ["Matemática", "Guía de sección"],
};
