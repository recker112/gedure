<?php

namespace App\Jobs\Gedure;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

// Models
use App\Models\User;

// Notifications
use App\Imports\StudiendImport;

class UsersImportProcess implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected User $user;
    protected string $excelPath;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, string $excelPath)
    {
        $this->user = $user;
        $this->excelPath = $excelPath;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // NOTA(RECKER): Procesar excel
		(new StudiendImport($this->user))->import($this->excelPath);

        // NOTA(RECKER): Eliminar archivo usado
        Storage::delete($this->excelPath);

        // NOTA(RECKER): crear logs
        $this->user->logs()->create([
			'action' => 'Carga de matricula',
			'type' => 'user-manager',
		]);
    }
}
