<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
//Mails
use App\Mail\Invitation;
//Models
use App\Models\User;

class Mailcontroller extends Controller
{
	public function email() 
	{
		$user = User::find(1);

		return new Invitation($user,'4J48S');
	}
}
