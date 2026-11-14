/**
 * Datos institucionales compartidos (layout, contacto, metadatos). Los textos
 * vienen de la web anterior (rama master). Lo marcado como `null` está
 * pendiente de confirmar con el colegio y la UI lo muestra como "Próximamente".
 */
export const SCHOOL = {
  shortName: "La Candelaria",
  name: "U.E.P. A.P.E.P. «La Candelaria»",
  fullName: "Unidad Educativa Privada A.P.E.P. «La Candelaria»",
  motto: "Enfocados en el Estudio y la Fe",
  founded: 1984,
  city: "Turmero",
  summary:
    "La U.E.P. A.P.E.P. «La Candelaria» brinda sus instalaciones a estudiantes de Primaria, Centro Taller Pre-Vocacional a los estudiantes de 6.º grado de Escuelas Amigas, Media General y Media Técnica. Tiene como norte la formación integral, en valores y principios religiosos, basados en la Fe Católica. Siguiendo la filosofía A.P.E.P., educar para la vida y para el trabajo: los futuros Técnicos Medios en las diferentes menciones tienen la oportunidad de iniciarse en el campo laboral luego de realizar el proceso de pasantías en su último año.",
  address: {
    street: "Av. Bolívar N.º 9",
    parish: "Parroquia Capital Turmero",
    municipality: "Municipio Santiago Mariño",
    state: "Estado Aragua, Venezuela",
    references: [
      { label: "Norte", value: "Av. Bolívar, intersección con la calle Páez" },
      { label: "Sur", value: "Av. Mariño" },
      { label: "Este", value: "Calle Camilo Torres" },
      { label: "Oeste", value: "Calle Ribas — Plaza Mariño de Turmero" },
    ],
  },
  coords: { lat: 10.227801, lng: -67.471912 },
  contact: {
    phone: null,
    email: "info@lacandelaria.com.ve",
    schedule: "Lunes a Viernes, 7:00 AM - 3:00 PM",
  },
  // Sin URL todavía: se pintan desactivados con "Próximamente".
  socials: [
    { id: "instagram", label: "Instagram", url: null },
    { id: "facebook", label: "Facebook", url: null },
    { id: "youtube", label: "YouTube", url: null },
  ],
  gedureRepo: "https://github.com/recker112/gedure",
};

/** Enlace para abrir la ubicación en Google Maps. */
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${SCHOOL.coords.lat},${SCHOOL.coords.lng}`;

/** Mapa embebido de OpenStreetMap (sin API key ni cookies de terceros). */
export function osmEmbedUrl({ lat, lng }, delta = 0.004) {
  const bbox = [lng - delta, lat - delta / 2, lng + delta, lat + delta / 2].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}
