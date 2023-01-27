<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class StudentsExport implements FromQuery, WithHeadings, WithMapping, WithTitle
{
    use Exportable;

    public function __construct(string $code = null)
    {
        $this->code = $code;
    }

    public function headings(): array
    {
        return [
            'n_lista',
            'nced',
            'nomalum',
            'email'
        ];
    }

    public function query()
    {
        return User::query()->with('alumno')->where('privilegio', 'V-')
            ->when(!empty($this->code),function ($query) {
                $query->whereHas('alumno', function ($query) {
                    $query->whereHas('curso', function ($query) {
                        $query->where('code', 'like', $this->code);
                    });
                });
            })
            ->when(empty($this->code), function ($query) {
                $query->doesntHave('alumno');
            });
    }

    public function map($students): array
    {
        return [
            $students->alumno?->n_lista,
            $students->username,
            $students->name,
            $students->email,
        ];
    }

    public function title(): string
    {
        return $this->code ?? 'Sin curso';
    }
}
