<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Enlaces de activación (docs/fases/fase-1-usuarios.md §2.2), modelo
     * `App\Models\Usuarios\Activacion`: una cuenta creada por administración
     * elige con él su contraseña. La cuenta ya existe (pendiente).
     *
     * - user_id: único, una activación vigente por persona; reenviar rota el
     *   token en la misma fila.
     * - token_hash: `sha256` del token (64 caracteres); el claro solo va en el correo.
     * - enviada_por: quien la envió por última vez (`nullOnDelete`).
     */
    public function up(): void
    {
        Schema::create('activaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->char('token_hash', 64)->unique();
            $table->foreignId('enviada_por')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('sent_at');
            $table->timestamp('expires_at');
            $table->timestamp('used_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activaciones');
    }
};
