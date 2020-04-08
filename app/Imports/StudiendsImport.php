<?php

namespace App\Imports;

//Excel
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StudiendsImport implements ToCollection, WithHeadingRow 
{
	/**
	* @param array $row
	*
	* @return \Illuminate\Database\Eloquent\Model|null
	*/
	public function collection(Collection $rows)
	{
		//
	}
}
