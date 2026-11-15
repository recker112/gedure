<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Datos de contacto y estado de la cuenta (docs/fases/fase-1-usuarios.md §2.1).
     *
     * - Dominio en español (`telefono`, `direccion`, `sexo`); estado de cuenta en
     *   inglés, como `deleted_at` de Laravel.
     * - No hay columna `estado`: se deriva de las fechas (`User::estado()`), y la
     *   baja manda sobre la suspensión y esta sobre la activación pendiente.
     * - Autoría (`suspended_by`, `deleted_by`) con `nullOnDelete`: si se borrara de
     *   verdad a quien suspendió o dio de baja, el registro se conserva sin autor.
     * - Baja = `SoftDeletes`: nunca se borra un usuario. La baja sigue ocupando su
     *   cédula y su correo (únicos), así que restaurarla no choca con nadie.
     *
     * Las cuentas que ya existían quedan activadas desde su creación: antes de
     * esta migración no había cuentas pendientes de elegir contraseña.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('telefono', 20)->nullable()->after('email');
            $table->string('direccion', 255)->nullable()->after('telefono');
            $table->char('sexo', 1)->nullable()->after('direccion');
            $table->timestamp('activated_at')->nullable()->after('password_changed_at');
            $table->timestamp('last_login_at')->nullable()->after('activated_at');
            $table->timestamp('suspended_at')->nullable()->after('last_login_at');
            $table->string('suspended_reason', 120)->nullable()->after('suspended_at');
            $table->foreignId('suspended_by')->nullable()->after('suspended_reason')->constrained('users')->nullOnDelete();
            $table->softDeletes()->after('updated_at');
            $table->foreignId('deleted_by')->nullable()->after('deleted_at')->constrained('users')->nullOnDelete();

            // Filtros del listado (suspendidas, bajas)
            $table->index('suspended_at');
            $table->index('deleted_at');
        });

        DB::table('users')->update(['activated_at' => DB::raw('COALESCE(created_at, CURRENT_TIMESTAMP)')]);
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['suspended_at']);
            $table->dropIndex(['deleted_at']);
            $table->dropConstrainedForeignId('deleted_by');
            $table->dropSoftDeletes();
            $table->dropConstrainedForeignId('suspended_by');
            $table->dropColumn([
                'telefono', 'direccion', 'sexo', 'activated_at', 'last_login_at', 'suspended_at', 'suspended_reason',
            ]);
        });
    }
};
