<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
	/**
	 * The Artisan commands provided by your application.
	 *
	 * @var array
	 */
	protected $commands = [
		Commands\Payments::class,
		Commands\Exchanges::class,
	];

	/**
	 * Define the application's command schedule.
	 *
	 * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
	 * @return void
	 */
	protected function schedule(Schedule $schedule)
	{
		// NOTA(RECKER): Reiniciar queues
		$schedule->command('queue:restart')
			->daily();
		
		// NOTA(RECKER): Iniciar queues
		$schedule->command('queue:work --tries=3 --backoff=5 --queue=high,commands,default,emails')
			->withoutOverlapping()
			->runInBackground();
		
		// NOTA(RECKER): Limpiar passport
		$schedule->command('passport:purge')
			->daily();

		// NOTA(RECKER): Actualizar precio del dolar
		$schedule->command('exchanges:prices')
			->hourlyAt(5);
		
		/*$schedule->command('pending:payments')
			->weeklyOn(5, '20:00');*/
	}

	/**
	 * Register the commands for the application.
	 *
	 * @return void
	 */
	protected function commands()
	{
		$this->load(__DIR__.'/Commands');

		require base_path('routes/console.php');
	}
}
