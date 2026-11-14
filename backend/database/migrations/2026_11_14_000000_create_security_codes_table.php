<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Códigos de un solo uso enviados por correo (2FA del login y
     * restablecimiento de contraseña). Solo se guarda el HMAC del código
     * (`token_hash`, ver SecurityCode::hash), nunca el código en claro.
     * `attempts`: fallos acumulados (al llegar a SecurityCode::MAX_ATTEMPTS el
     * código deja de aceptarse).
     */
    public function up(): void
    {
        Schema::create('security_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->char('token_hash', 64);
            $table->enum('type', ['password_reset', 'two_factor_auth']);
            $table->unsignedTinyInteger('attempts')->default(0);
            $table->timestamp('used_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('expire_at');

            $table->index(['user_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('security_codes');
    }
};
