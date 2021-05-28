<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

// Models
use App\Models\WalletSystem\BankTransaction;

class BankTransactionImport implements ToModel, WithHeadingRow, ShouldQueue, WithChunkReading
{
	use Importable;
	
	protected $bank_id;

	public function __construct($bank_id)
	{
		$this->bank_id = $bank_id;
	}
	
	public function model(array $row)
	{
		$parse = trim($row['concepto']);
		$parse = explode('.', $parse);
		if (count($parse) < 4 || $row['abono'] === null || $row['referencia'] === null) {
			return null;
		}
		$concepto = explode(' ', $parse[2])[0];
		$code = str_replace(['(', ')'], "", $parse[3]);
		$date = explode('/', trim($row['fecha']));
		$date = "$date[2]-$date[1]-$date[0]";

		return new BankTransaction([
			'bank_account_id' => $this->bank_id,
			'reference' => $row['referencia'],
			'concepto' => $concepto,
			'amount' => $row['abono'],
			'date' => $date,
			'code' => $code,
		]);
	}
	
	public function headingRow(): int
	{
		return 11;
	}
	
	public function chunkSize(): int
	{
		return 1000;
	}
}
