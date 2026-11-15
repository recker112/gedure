<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Bitácora de cada persona (docs/fases/fase-1-usuarios.md §2.5), modelo
     * `App\Models\Usuarios\Actividad`. Solo se crea: sin `updated_at`.
     *
     * - user_id: el sujeto. `cascadeOnDelete` solo actúa en un borrado físico;
     *   las bajas (SoftDeletes) conservan su historial.
     * - actor_id: quien hizo la acción; `null` = el sistema o la propia persona.
     * - tipo: `App\Enums\Usuarios\TipoActividad`, valores estables.
     * - meta: datos del evento. El título NO se guarda: se calcula desde `tipo` y
     *   `meta` con `lang/es/actividad.php`.
     *
     * Índice del cursor: (user_id, created_at, id), recorrido al revés para
     * `created_at desc, id desc`; (user_id, tipo) sirve al filtro por tipo.
     */
    public function up(): void
    {
        Schema::create('actividades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('tipo', 40);
            $table->json('meta')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index(['user_id', 'created_at', 'id']);
            $table->index(['user_id', 'tipo']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('actividades');
    }
};
