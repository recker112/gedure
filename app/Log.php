<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Log extends Model
{
  protected $hidden = [
		'id'
	];
	
	public function user()
	{
		return $this->belongsTo('App\User');
	}
	
	public $timestamps = ["created_at"];
	const UPDATED_AT = null;
}
