<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;

class MatriculaExport implements FromArray
{
	public $data;
	/**
	* @return \Illuminate\Support\Collection
	*/
	public function array(): array
	{
		return $this->data;
	}
}
