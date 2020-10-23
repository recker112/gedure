<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
	protected $casts = [
		'created_at' => 'date:Y-m-d H:i',
		'updated_at' => 'datetime:Y-m-d H:i:s',
	];
	
	public function user()
	{
		return $this->belongsTo('App\User', 'user_id_owner');
	}
}