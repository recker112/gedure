# Colas

Conexión `database` (tabla `jobs`). El `worker` atiende las colas con **prioridad estricta**: mientras `high` tenga trabajos, el resto espera.

## Colas actuales (`App\Enums\QueueName`)

| Cola | Qué va | Ejemplos |
|---|---|---|
| `high` | Lo que la persona espera con la pantalla abierta | `TfaCodeMail`, `SecurityCodeMail`, `ActivacionCuentaMail` (alta y reenvío; se encola con `afterCommit()`) |
| `events` | Notificaciones, broadcasts y listeners | `PermissionsUpdated`, notificaciones de notas publicadas |
| `default` | Lo que no indique otra cola | jobs sin urgencia |
| `emails` | Correos que nadie espera en el momento | `PasswordChangedMail`, `CorreoCambiadoMail` (aviso al correo anterior, `afterCommit()`), avisos de deuda |

El orden de los casos del enum **es** la prioridad. `QueueName::workerList()` debe coincidir con `--queue` en `docker/prod/entrypoint.sh` y `docker/dev/entrypoint.sh` (lo vigila `tests/Feature/QueueRoutingTest.php`). Una cola nueva se añade en los tres sitios.

BluLabel tiene además `commands` (entre `high` y `events`) para jobs lanzados por comandos (`AnnounceRelease`). Gedure no la tiene; añádela solo si aparece un caso.

## Cómo se fija la cola

En la **clase**, con el atributo, nunca con `->onQueue()` en la llamada:

```php
use App\Enums\QueueName;
use Illuminate\Queue\Attributes\Queue;

#[Queue(QueueName::High)]
class TfaCodeMail extends Mailable implements ShouldQueue { /* ... */ }
```

- La cola va en la clase, así que un mismo correo no cambia de cola según quién lo pida. `ActivacionCuentaMail` es `high`; las activaciones de la importación (PR #11 de la fase 1) deben ir en `emails`: una variante o subclase con `#[Queue(QueueName::Emails)]` (p. ej. `ActivacionCuentaImportadaMail extends ActivacionCuentaMail`), nunca `->onQueue()`.
- Correos: `Mail::to(...)->queue(new X)`, nunca `send()` (sin worker no sale ninguno).
- Notificaciones: `viaQueues()` (un trabajo por canal) y, para `broadcast`, `BroadcastMessage::onQueue(QueueName::Events->value)` (el evento interno de la notificación iría a `default`).
- Eventos `ShouldBroadcast` y listeners `ShouldQueue`: atributo en la clase y `afterCommit` cuando dependen de una transacción.

## Trabajos pesados previstos

| Fase | Trabajo | Cola propuesta | Nota |
|---|---|---|---|
| 1 | Importación masiva CSV/Excel de usuarios | `default` | Job por archivo, informe de filas fallidas; idempotente por cédula. |
| 4 | Generación de boletas PDF por sección | `default` | Un job por sección (o por lote), resultado en disco; aviso por notificación al terminar. |
| 4 | Resumen final / notas certificadas (Word) | `default` | Igual. |
| 5 | Lotes de deuda (mensualidades) | `default` | Una transacción por representante; `failed` como en las operaciones en bloque. |
| 6 | Conciliación de estado de cuenta | `default` | Lee el archivo, empareja y marca; repetible sin duplicar. |
| 7 | Envío de comunicados a una audiencia | `events` | `chunkById(200)`, audiencia calculada al ejecutar. |

Si un trabajo largo empieza a retrasar `default`, se valora una cola `reports` por debajo de `default`.

## Tareas programadas

`routes/console.php`, contenedor `schedule`: hoy `auth:prune-idle-tokens` y `model:prune` de `SecurityCode` y `Activacion` (activaciones usadas o caducadas, tras 30 días: `usuarios.activacion.conservar_dias`), diarios. Tareas futuras (p. ej. tasa BCV, recordatorios de deuda) van ahí con `withoutOverlapping()`.
