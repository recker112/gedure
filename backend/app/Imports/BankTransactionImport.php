<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\ImportFailed;
use Illuminate\Support\Facades\Notification;

// Models
use App\Models\User;
use App\Models\Gedure\Log;
use App\Models\WalletSystem\BankTransaction;
use App\Models\WalletSystem\BankAccount;

// Notifications
use App\Notifications\SocketsNotification;

class BankTransactionImport implements ToModel, WithHeadingRow, ShouldQueue, WithChunkReading,  WithEvents
{
	use Importable;

	// NOTA(RECKER): Configuraciones del queue
	public $tries = 2;
	public $backoff = 0;
	
	// NOTA(RECKER): Vars
	protected int $bank_id;
	protected User $importedBy;

	public function __construct(int $bank_id, User $importedBy = new User)
	{
		$this->bank_id = $bank_id;
		$this->importedBy = $importedBy;
	}
	
	public function model(array $row)
	{
		$bank_account = BankAccount::find($this->bank_id);

		// NOTA(RECKER): Verificar si el código es el deseado
		if ($row['codigo'] !== 'NC') {
			return null;
		}

		if (floatval($row['credito']) <= 0) {
			return null;
		}
		
		// NOTA(RECKER): Dividir string
		$conceptoParse = trim($row['concepto']);
		$conceptoParse = explode(' ', $conceptoParse);
		
		// NOTA(RECKER): Verificar si es una transferencia desde el mismo banco
		$bypass = $row['concepto'] == 'TRANSFERENCIA A TERCEROS' ? true : false;
		
		// NOTA(RECKER): Acomobar textos
		$concepto = $bypass ? $row['referencia'] : $conceptoParse[2];
		$code = $bypass ? $bank_account->code : $conceptoParse[1];
		$date = now()->parse($row['fecha']." GMT-4");
		$amount = round(floatval($row['credito']), 2);
		
		// NOTA(RECKER): Buscar si ya existe una transferencia similar
		$find = BankTransaction::where('date', $date)
			->where('concepto', $concepto)
			->where('reference', $row['referencia'])
			->where('amount', $amount)
			->first();
			
		if($find) {
			return null;
		}

		return new BankTransaction([
			'bank_account_id' => $this->bank_id,
			'reference' => $row['referencia'],
			'concepto' => $concepto,
			'amount' => $amount,
			'date' => $date,
			'code' => $code,
		]);
	}
	
	public function headingRow(): int
	{
		return 3;
	}
	
	public function chunkSize(): int
	{
		return 500;
	}

	public function registerEvents(): array
    {
			return [
				ImportFailed::class => function(ImportFailed $event) {
					if ($this->importedBy->id) {
						$this->importedBy->notify(new SocketsNotification(
							'Carga de transacciones bancarias fallida', 
							'El sistema no pudo procesar el archivo, es posible que haya alguna falla en el formato del archivo excel.',
							['error' => $event->getException()->getMessage()]
						));
					} else {
						Log::create([
							'action' => 'Carga de transacciones fallida',
							'user_id' => null,
							'type' => 'gedure',
            ]);
					}
				},
			];
    }
}
