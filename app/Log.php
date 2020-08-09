<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Log extends Model
{
  protected $hidden = [
		'id'
	];
	
	public $timestamps = ["created_at"];
	const UPDATED_AT = null;
}
