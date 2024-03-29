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
		Commands\DebtAutomatize::class,
		Commands\DebtUpdate::class,
		Commands\Bicentenario::class,
	];

	/**
	 * Define the application's command schedule.
	 *
	 * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
	 * @return void
	 */
	protected function schedule(Schedule $schedule)
	{
		// Reiniciar queues
		$schedule->command('queue:restart')
			->timezone('America/Caracas')
			->daily()
			->appendOutputTo(storage_path('logs/queue_restart.log'));

		// Iniciar queues DEV
		$schedule->command('queue:listen --tries=3 --backoff=5 --queue=high,commands,default,emails')
		->environments(['local'])
		->withoutOverlapping()
		->runInBackground()
		->appendOutputTo(storage_path('logs/queue_listen.log'));
		
		// Limpiar passport
		$schedule->command('passport:purge')
			->timezone('America/Caracas')
			->weekly()
			->appendOutputTo(storage_path('logs/passport_purge.log'));

		// Actualizar precio del dolar
		$schedule->command('exchanges:prices')
			->timezone('America/Caracas')
			->weeklyOn(7, '10:00')
			->appendOutputTo(storage_path('logs/exchanges_price.log'))
			->runInBackground();
		
		// Automatizar proceso de deudas
		$schedule->command('debt:automatize')
			->timezone('America/Caracas')
			->monthlyOn(1, '06:00')
			->appendOutputTo(storage_path('logs/debt_automatize.log'))
			->runInBackground();

		// Actualizar precios de deudas en precio extranjero
		$schedule->command('debt:update')
			->timezone('America/Caracas')
			->weeklyOn(7, '11:00')
			->appendOutputTo(storage_path('logs/debt_update_prices.log'))
			->runInBackground();

		// // Descargar estado de cuenta ONLY server Venezuela
		// $schedule->command('bicentenario:get')
		// 	->timezone('America/Caracas')
		// 	->dailyAt('11:00')
		// 	->appendOutputTo(storage_path('logs/bicentenario.log'));
		
		// Procesar pagos pendientes
		$schedule->command('pending:payments')
			->timezone('America/Caracas')
			->weekdays()
			->dailyAt('11:00')
			->appendOutputTo(storage_path('logs/debt_pay_pending.log'));


		// Backups
		$schedule->command('backup:run --only-db')
			->timezone('America/Caracas')
			->daily()
			->appendOutputTo(storage_path('logs/backup.log'));

		$schedule->command('backup:run --only-files')
			->timezone('America/Caracas')
			->weeklyOn(7, '00:00')
			->appendOutputTo(storage_path('logs/backup.log'));
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
