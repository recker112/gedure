import { use } from "react";

import { MockRoleContext } from "../../context/mockRole/MockRoleContext";
import { ROLES } from "../../context/mockRole/roles";

/** MAQUETA: rol de la vista actual y su setter, más sus metadatos (`info`). */
export function useMockRole() {
  const { role, setRole } = use(MockRoleContext);
  return { role, setRole, info: ROLES[role] };
}
