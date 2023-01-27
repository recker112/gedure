<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

// Excel
use App\Exports\StudentsExport;

// Models
use App\Models\Gedure\Curso;

class StudentsFullExport implements WithMultipleSheets
{
    use Exportable;

    /**
     * @return array
     */
    public function sheets(): array
    {
        $sheets = [];

        $cursos = Curso::orderBy('curso')->orderBy('seccion')->has('alumnos')->get();

        foreach($cursos as $curso) {
            $sheets[] = new StudentsExport($curso->code);
        }
        
        $sheets[] = new StudentsExport();

        return $sheets;
    }
}