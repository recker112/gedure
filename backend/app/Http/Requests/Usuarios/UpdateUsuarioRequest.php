<?php

namespace App\Http\Requests\Usuarios;

/**
 * `PATCH /usuarios/{id}`: solo los campos enviados (`name, username, email,
 * telefono, direccion, sexo`). La cédula se exige si la persona **ya** tiene
 * rol profesor o representante (los roles se cambian aparte).
 */
class UpdateUsuarioRequest extends UsuarioTargetRequest
{
    use ReglasUsuario;

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return collect($this->reglasDatos($this->target()->getRoleNames()->all(), $this->target()->id))
            ->map(fn (array $reglas) => ['sometimes', ...$reglas])
            ->all();
    }
}
