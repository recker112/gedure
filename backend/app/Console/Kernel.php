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
		Commands\FixDiskUrl::class,
		Commands\SendNotification::class,
		Commands\ClearNotifications::class,
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
			->daily()
			->sendOutputTo(storage_path('logs/queue_restart.log'));
		
		// NOTA(RECKER): Iniciar queues
		$schedule->command('queue:work --tries=3 --backoff=5 --queue=high,commands,default,emails')
		->environments(['production'])
		->withoutOverlapping()
		->runInBackground()
		->appendOutputTo(storage_path('logs/queue_work.log'));

		// NOTA(RECKER): Iniciar queues DEV
		$schedule->command('queue:listen --tries=3 --backoff=5 --queue=high,commands,default,emails')
		->environments(['local'])
		->withoutOverlapping()
		->runInBackground()
		->appendOutputTo(storage_path('logs/queue_listen.log'));

		// NOTA(RECKER): Iniciar websockets
		$schedule->command('websockets:serve')
		->environments(['production'])
		->withoutOverlapping()
		->runInBackground()
		->appendOutputTo(storage_path('logs/websockets_serve.log'));
		
		// NOTA(RECKER): Limpiar passport
		$schedule->command('passport:purge')
			->daily()
			->sendOutputTo(storage_path('logs/passport_purge.log'));

		// NOTA(RECKER): Actualizar precio del dolar
		$schedule->command('exchanges:prices')
			->hourlyAt(5)
			->sendOutputTo(storage_path('logs/exchanges_price.log'))
			->runInBackground();
		
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
