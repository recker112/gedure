<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

// Models
use App\Models\WalletSystem\BankTransaction;
use App\Models\WalletSystem\BankAccount;

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
		$bank_account = BankAccount::find($this->bank_id);
		
		// NOTA(RECKER): Dividir string
		$parse = trim($row['concepto']);
		$parse = explode('.', $parse);
		
		// NOTA(RECKER): Verificar si es una transferencia desde el mismo banco
		$bypass = $row['concepto'] == 'TRANSFERENCIA A TERCEROS' ? true : false;
		if ($row['concepto'] != 'TRANSFERENCIA A TERCEROS' && count($parse) < 4) {
			return null;
		}
		
		// NOTA(RECKER): Verificar no null
		if ($row['abono'] === null || $row['referencia'] === null) {
			return null;
		}
		
		// NOTA(RECKER): Acomobar textos
		$concepto = $bypass ? $row['referencia'] : explode(' ', $parse[2])[0];
		$code = $bypass ? $bank_account->code : str_replace(['(', ')'], "", $parse[3]);
		$date = explode('/', trim($row['fecha']));
		$date = "$date[2]-$date[1]-$date[0]";
		
		// NOTA(RECKER): Buscar si ya existe una transferencia similar
		$find = BankTransaction::where('date', $date)
			->where('concepto', $concepto)
			->where('reference', $row['referencia'])
			->where('amount', $row['abono'])
			->first();
			
		if($find) {
			return null;
		}

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
