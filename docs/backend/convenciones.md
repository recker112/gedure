# Convenciones de nombres y estilo (backend)

## Idioma

| Qué | Idioma | Ejemplo |
|---|---|---|
| Sufijos técnicos y verbos de Laravel | Inglés | `Controller`, `Service`, `Request`, `Resource`, `Policy`, `store`, `update`, `destroy` |
| Conceptos del dominio escolar | Español, ASCII (sin tildes ni ñ) | `Lapso`, `Seccion`, `PlanEstudio`, `Materia`, `Inscripcion`, `Monedero` |
| Lo que ya existe en inglés | Se queda | `User`, `SecurityCode`, `AuthController`, `PersonalAccessToken` |
| Comentarios, `msg`, correos, títulos de tests | Español | `'El lapso ya está cerrado'` |
| Commits | Español, Conventional Commits | `feat(academico): ciclo de vida de lapsos` |

Por qué español en el dominio: términos como lapso, mención, pensum o representante no tienen una traducción inequívoca y el código debe leerse igual que habla el personal del colegio y el ministerio.

Glosario de nombres **aprobados** (clases en español con tabla explícita; nombres de recursos nuevos se confirman en el diseño de cada fase):

| Concepto | Clase / tabla | Nota |
|---|---|---|
| Año escolar (2026-2027) | `PeriodoEscolar` / `periodos_escolares` | Evita la ambigüedad con "año" = grado de media general. |
| Lapso (1, 2, 3) | `Lapso` / `lapsos` | |
| Plan de estudio (código del ministerio) | `PlanEstudio` / `planes_estudio` | Primaria y cada mención. |
| Grado o año dentro de un plan | `Grado` / `grados` | "3.er grado", "4.º año". |
| Materia (catálogo único) | `Materia` / `materias` | |
| Pensum (materias de un grado de un plan) | `PensumMateria` / `pensum_materias` | |
| Sección | `Seccion` / `secciones` | |
| Asignación profesor–materia–sección | `Asignacion` / `asignaciones` | |
| Inscripción | `Inscripcion` / `inscripciones` | |
| Nota final de lapso | `Nota` / `notas` | |
| Estudiante (registro, **no** usuario: no inicia sesión) | `Estudiante` / `estudiantes` | Cédula escolar o de identidad, datos personales. |
| Representante–estudiante (N:M) | pivote `estudiante_representante` (`User` con rol `representante` ↔ `Estudiante`) | Con parentesco y, si hace falta, "representante principal" para cobros. |

## Clases

- Controller: `<Recurso>Controller` con métodos REST (`index`, `show`, `store`, `update`, `destroy`) y acciones de dominio en español (`abrir`, `cerrar`). Un controller por recurso; si crece, uno por subrecurso (`LapsoCierreController`).
- FormRequest: `<Accion><Recurso>Request` (`StoreSeccionRequest`, `CerrarLapsoRequest`); base de acciones sobre un registro: `<Recurso>TargetRequest` (busca el modelo, 404, Policy).
- Service: `<Recurso>Service` o por proceso (`TransicionPeriodoService`, `ConciliacionService`). Métodos con verbos de dominio.
- Resource: `<Recurso>Resource` (+ variantes como `<Recurso>ManageResource` si la vista de gestión expone más).
- Enum: nombre en singular (`EstadoLapso`), casos en PascalCase, valores en `snake_case` (`case Abierto = 'abierto'`).
- Evento: participio (`LapsoCerrado`, `NotasPublicadas`); job: verbo (`GenerarBoletasSeccion`); notificación: lo que comunica (`BoletaDisponible`), con `type()` estable en `snake_case`.

## Base de datos

- Tablas en plural `snake_case`, declaradas con `#[Table]` en el modelo cuando el plural no es el de Laravel.
- Claves foráneas `<singular>_id` (`seccion_id`, `periodo_escolar_id`) con `constrained()` y la acción de borrado explícita (`restrictOnDelete()` por defecto en datos académicos: nunca se borra en cascada un historial de notas).
- Montos de dinero en enteros de céntimos o `decimal(14,2)`, nunca `float`; moneda explícita (`moneda` `VES`/`USD`) — decidir en la fase 5.
- Notas: columnas separadas para numérica (`tinyint` 1–20) y literal (`char(1)` A–E + descripción), según el nivel ([roadmap](../roadmap.md)).
- Migraciones nuevas, nunca editar una ya desplegada.

## Lenguaje y traducciones

- `lang/es/validation.php` → `attributes` para cada campo nuevo.
- `lang/es/<modulo>.php` para los mensajes de dominio.
- `lang/es/permission.php` para los 403.

## Formato

`./vendor/bin/pint` (dentro del contenedor) antes de abrir el PR.
