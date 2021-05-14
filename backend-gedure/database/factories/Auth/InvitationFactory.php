<?php

namespace Database\Factories\Auth;

use App\Models\Auth\Invitation;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvitationFactory extends Factory
{
	/**
	 * The name of the factory's corresponding model.
	 *
	 * @var string
	 */
	protected $model = Invitation::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		return [
			'user_id' => rand(1,5),
			'invitation_key' => Str::random(40)
		];
	}
}
