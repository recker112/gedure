<?php

namespace Tests\Feature\Controllers\Gedure;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

// Passport
use Laravel\Passport\Passport;

// Models
use App\Models\User;

// Notifications
use App\Notifications\SocketsNotification;

class NotificationControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetNotifications()
    {
        //$this->withoutExceptionHandling();
        $user = User::find(1);

		Passport::actingAs(
			$user,
			['admin']
		);

        $user->notify(new SocketsNotification('Title1', 'Content'));
        $user->notify(new SocketsNotification('Title2', 'Content'));
        $user->load('notifications');

        $response = $this->getJson('/api/v1/notification?limit=1');

        $response->assertStatus(200)
			->assertJsonStructure([
				'data' => [
                    '*' => [
                        'type',
                        'id',
                        'data',
                        'read_at',
                    ]
                ],
                'finish',
			])
            ->assertJsonPath('finish', false);
    }
}
