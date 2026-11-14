import { createContext } from "react";

import { DEFAULT_ROLE } from "./roles";

/** MAQUETA: `{ role, setRole }` de la vista de rol (ver MockRoleProvider). */
export const MockRoleContext = createContext({ role: DEFAULT_ROLE, setRole: () => {} });
