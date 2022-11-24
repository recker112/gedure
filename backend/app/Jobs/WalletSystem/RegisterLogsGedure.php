<?php

namespace App\Jobs\WalletSystem;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

// Models
use App\Models\Gedure\Log;

class RegisterLogsGedure implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected string $title;
    protected array $payload;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $title, array $payload = null)
    {
        $this->title = $title;
        $this->payload = $payload;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::create([
            'action' => $this->title,
            'payload' => $this->payload,
            'user_id' => null,
            'type' => 'gedure',
        ]);
    }
}
