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
	];

	/**
	 * Define the application's command schedule.
	 *
	 * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
	 * @return void
	 */
	protected function schedule(Schedule $schedule)
	{
		// php artisan schedule:run
		$schedule->command('queue:work --tries=3 --backoff=5 --queue=high,commands,default,emails')
			->everyMinute()
			->withoutOverlapping()
			->runInBackground();
		
		$schedule->command('passport:purge')
			->daily();
		
		/*$schedule->command('pending:payments')
			->weeklyOn(5, '20:00');*/
		
		$schedule->command('queue:reset')
			->daily();
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
