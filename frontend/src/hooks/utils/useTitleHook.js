import { useEffect } from "react";

import { SCHOOL } from "../../school";

/**
 * Título de la pestaña: "<página> · La Candelaria", o solo el nombre del
 * colegio sin título.
 */
export default function useTitleHook(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SCHOOL.shortName}` : SCHOOL.shortName;
  }, [title]);
}
