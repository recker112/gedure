import { describe, expect, test } from "vitest";

import { canAccess } from "../../hooks/auth/useCanAccess";
import { buildPanelMenu } from "./panelMenu";

const Icon = () => null;

const academico = {
  key: "academico",
  title: "Académico",
  icon: Icon,
  permission: ["academico.periodo.show", "academico.seccion.show"],
  menu: [
    { title: "Años escolares", icon: Icon, index: true, permission: "academico.periodo.show" },
    { title: "Secciones", icon: Icon, path: "secciones", permission: "academico.seccion.show" },
    {
      title: "Planes",
      icon: Icon,
      path: "planes",
      children: [
        { title: "Resumen", index: true, permission: "academico.plan.show" },
        { title: "Materias", path: "materias", permission: "academico.materia.show" },
      ],
    },
  ],
};
const cuentaLibre = { key: "avisos", title: "Avisos", icon: Icon };
const pagos = { key: "pagos", title: "Pagos", icon: Icon, permission: "pagos.pago.show", disabled: true };

const canWith = (permissions, isOwner = false) => (rule) => canAccess({ permissions, isOwner }, rule);

describe("buildPanelMenu", () => {
  test("filtra módulos y entradas con la misma regla que las rutas", () => {
    const menu = buildPanelMenu([academico, pagos], canWith({ "academico.seccion.show": true }));

    expect(menu).toHaveLength(1);
    expect(menu[0]).toMatchObject({ key: "academico", url: "/gedure/academico", disabled: false });
    expect(menu[0].entries).toEqual([{ title: "Secciones", icon: Icon, url: "/gedure/academico/secciones" }]);
  });

  test("un grupo sale solo con alguna hija visible, con las URL anidadas", () => {
    const [mod] = buildPanelMenu([academico], canWith({ "academico.periodo.show": true, "academico.materia.show": true }));

    expect(mod.entries.map((e) => e.url)).toEqual(["/gedure/academico", "/gedure/academico/planes"]);
    expect(mod.entries[1].children).toEqual([{ title: "Materias", icon: undefined, url: "/gedure/academico/planes/materias" }]);
  });

  test("un módulo sin entradas visibles no sale", () => {
    const sinIndice = { ...academico, permission: undefined };
    expect(buildPanelMenu([sinIndice], canWith({}))).toEqual([]);
  });

  test("sin menú, el módulo es un único enlace a su raíz", () => {
    const [mod] = buildPanelMenu([cuentaLibre], canWith({}));
    expect(mod.entries).toEqual([{ title: "Avisos", icon: Icon, url: "/gedure/avisos" }]);
  });

  test("un módulo deshabilitado sale como «Próximamente» (sin entradas) si se tiene su permiso", () => {
    expect(buildPanelMenu([pagos], canWith({}))).toEqual([]);
    const [mod] = buildPanelMenu([pagos], canWith({ "pagos.pago.show": true }));
    expect(mod).toMatchObject({ key: "pagos", disabled: true, entries: [] });
  });

  test("el owner lo ve todo, en el orden del registro", () => {
    const menu = buildPanelMenu([pagos, academico, cuentaLibre], canWith({}, true));
    expect(menu.map((m) => m.key)).toEqual(["pagos", "academico", "avisos"]);
    expect(menu[1].entries).toHaveLength(3);
  });
});
