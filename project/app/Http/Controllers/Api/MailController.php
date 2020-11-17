<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
//Mails
use App\Mail\CodeSecurity;
//Models
use App\Models\User;

class Mailcontroller extends Controller
{
	public function email() 
	{
		$user = User::find(1);
		Mail::to($user)->queue(new CodeSecurity($user,'4J48S'));

		return new CodeSecurity($user,'4J48S');
	}
}
