<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class CodeSecurity extends Mailable
{
	use Queueable, SerializesModels;

	public $subject = 'Código de confirmación';
	public $user = null;
	public $code = null;
	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct(User $user, $code)
	{
		$this->user = $user;
		$this->code = $code;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->view('emails.CodeSecurity');
	}
}
