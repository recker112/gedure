<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class Invitation extends Mailable
{
	use Queueable, SerializesModels;
	
	public $subject = 'Invitaciรณn al sistema';
	public $user = null;
	public $key = null;
	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct(User $user, $key)
	{
		$this->user = $user;
		$this->key = $key;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->view('emails.Invitation');
	}
}
