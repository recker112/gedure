<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Log extends Model
{
  protected $hidden = [
		'id'
	];
	
	public function relUser()
	{
		return $this->hasOne('App\User', 'cedula', 'log_owner');
	}
	
	public $timestamps = ["created_at"];
	const UPDATED_AT = null;
}
