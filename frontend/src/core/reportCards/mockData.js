/**
 * MAQUETA. Boletas (PDF por estudiante y lapso). En la Gedure anterior:
 * BoletaController con boletas_index / boletas_upload / boletas_edit.
 */
import { COURSES, courseLabel } from "../../mocks/mockData";

const STUDENTS = [
  ["María José Herrera", "V-32.104.553"],
  ["Santiago Rivas", "V-32.877.120"],
  ["Valentina Morales", "V-33.015.448"],
  ["Samuel Díaz", "V-32.560.871"],
  ["Camila Paredes", "V-32.990.304"],
  ["Sofía Castillo", "V-32.418.907"],
  ["Gabriel Ortega", "V-33.201.665"],
  ["Isabella Fuentes", "V-32.744.019"],
  ["Mateo Suárez", "V-33.118.236"],
  ["Victoria Lugo", "V-32.655.902"],
  ["Daniel Escalona", "V-32.871.447"],
  ["Paola Briceño", "V-33.004.581"],
];

const STATES = ["Subida", "Subida", "Subida", "Sin subir", "Reemplazada", "Subida", "Sin subir", "Subida", "Subida", "Sin subir", "Subida", "Subida"];
const COURSE_IDS = [5, 5, 5, 5, 5, 5, 3, 3, 4, 4, 4, 3];

/** Boletas del 1.er lapso por estudiante (gestión: admin y profesor). */
export const REPORT_CARDS = STUDENTS.map(([name, cedula], i) => {
  const course = COURSES.find((c) => c.id === COURSE_IDS[i]);
  return {
    id: i + 1,
    name,
    cedula,
    course: courseLabel(course),
    lapse: "1.er lapso",
    status: STATES[i],
    updated: STATES[i] === "Sin subir" ? "—" : `${10 + (i % 5)}/11/2026`,
    file: STATES[i] === "Sin subir" ? null : `${cedula.replace(/\D/g, "")}-L1.pdf`,
  };
});

/** Boletas de los representados (vista representante). */
export const MY_REPORT_CARDS = [
  {
    student: "Sofía Castillo",
    course: "2.º año A",
    items: [
      { id: 1, lapse: "1.er lapso 2026-2027", date: "14/11/2026", status: "Nuevo" },
      { id: 2, lapse: "3.er lapso 2025-2026", date: "15/07/2026", status: "Leído" },
      { id: 3, lapse: "2.º lapso 2025-2026", date: "10/04/2026", status: "Leído" },
    ],
  },
  {
    student: "Diego Castillo",
    course: "5.º grado A",
    items: [
      { id: 4, lapse: "1.er lapso 2026-2027", date: "12/11/2026", status: "Leído" },
      { id: 5, lapse: "3.er lapso 2025-2026", date: "15/07/2026", status: "Leído" },
    ],
  },
];
