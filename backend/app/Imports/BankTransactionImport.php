<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\ImportFailed;

// Models
use App\Models\User;
use App\Models\WalletSystem\BankTransaction;
use App\Models\WalletSystem\BankAccount;

// Notifications
use App\Notifications\ImportFailedNotification;

class BankTransactionImport implements ToModel, WithHeadingRow, ShouldQueue, WithChunkReading,  WithEvents
{
	use Importable;
	
	protected int $bank_id;

	protected User $importedBy;

	public function __construct(int $bank_id, User $importedBy)
	{
		$this->bank_id = $bank_id;
		$this->importedBy = $importedBy;
	}
	
	public function model(array $row)
	{
		$bank_account = BankAccount::find($this->bank_id);
		
		// NOTA(RECKER): Dividir string
		$conceptoParse = trim($row['concepto']);
		$conceptoParse = explode('.', $conceptoParse);
		
		// NOTA(RECKER): Verificar si es una transferencia desde el mismo banco
		$bypass = $row['concepto'] == 'TRANSFERENCIA A TERCEROS' ? true : false;

		// NOTA(RECKER): Verificar que exista algo válido en la fila concepto
		if ($row['concepto'] != 'TRANSFERENCIA A TERCEROS' && count($conceptoParse) < 4) {
			return null;
		}
		
		// NOTA(RECKER): Verificar no null
		if ($row['abono'] === null || $row['referencia'] === null) {
			return null;
		}
		
		// NOTA(RECKER): Acomobar textos
		$concepto = $bypass ? $row['referencia'] : explode(' ', $conceptoParse[2])[0];
		$code = $bypass ? $bank_account->code : str_replace(['(', ')'], "", $conceptoParse[3]);
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
			'amount' => round($row['abono'], 2),
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
		return 500;
	}

	public function registerEvents(): array
    {
			return [
				ImportFailed::class => function(ImportFailed $event) {
					$this->importedBy->notify(new ImportFailedNotification('¡Carga de transacciones bancarias fallida!', $event->getException()->getMessage()));
				},
			];
    }
}
