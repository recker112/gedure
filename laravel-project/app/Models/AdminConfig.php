<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminConfig extends Model
{
  use HasFactory;
	
	protected $fillable = [
		'user_id',
	];
	
	protected $hidden = [
		'created_at', 'updated_at', 'user_id', 'id'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}
